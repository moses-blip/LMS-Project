import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get messages between two users
export const getMessages = async (req, res) => {
  const { userId } = req.user; // From auth middleware
  const otherUserId = parseInt(req.params.otherUserId); // Parse as number
  const { page = 1, limit = 20 } = req.query;

  try {
    // Validate otherUserId
    if (isNaN(otherUserId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    console.log('Fetching messages between users:', { userId, otherUserId });

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: otherUserId
          },
          {
            senderId: otherUserId,
            receiverId: userId
          }
        ]
      },
      include: {
        user_message_senderIdTouser: {
          select: {
            firstName: true,
            lastName: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    });

    console.log(`Found ${messages.length} messages`);

    // Transform messages to match the expected format
    const transformedMessages = messages.map(msg => ({
      id: msg.id,
      content: msg.content,
      createdAt: msg.createdAt,
      updatedAt: msg.updatedAt,
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      isRead: msg.isRead,
      courseId: msg.courseId,
      sender: msg.user_message_senderIdTouser
    }));

    res.json({
      success: true,
      messages: transformedMessages.reverse() // Return in chronological order
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  const { userId } = req.user; // From auth middleware
  const { receiverId, content, courseId } = req.body;

  try {
    // Input validation
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content cannot be empty'
      });
    }

    const parsedReceiverId = parseInt(receiverId);
    if (isNaN(parsedReceiverId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid receiver ID'
      });
    }

    console.log('Creating message:', { senderId: userId, receiverId: parsedReceiverId, content });

    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderId: userId,
        receiverId: parsedReceiverId,
        courseId: courseId || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        isRead: false
      },
      include: {
        user_message_senderIdTouser: {
          select: {
            firstName: true,
            lastName: true,
            role: true
          }
        }
      }
    });

    console.log('Message created successfully:', message);

    // Transform the response to match the expected format
    const transformedMessage = {
      ...message,
      sender: message.user_message_senderIdTouser
    };

    res.status(201).json({
      success: true,
      message: transformedMessage
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Mark messages as read
export const markAsRead = async (req, res) => {
  const { userId } = req.user;
  const { senderId } = req.params;

  try {
    await prisma.message.updateMany({
      where: {
        senderId: parseInt(senderId),
        receiverId: userId,
        isRead: false
      },
      data: {
        isRead: true
      }
    });

    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark messages as read',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 