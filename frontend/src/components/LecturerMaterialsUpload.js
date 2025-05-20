// src/components/LecturerMaterialsUpload.js
import React, { useState, useCallback } from 'react';
import { FaUpload, FaFileAlt, FaTrash } from 'react-icons/fa';
import styles from './LecturerMaterialsUpload.module.css';

const LecturerMaterialsUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  const onDrop = useCallback(e => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const onDragOver = useCallback(e => {
    e.preventDefault();
  }, []);

  const handleFilePick = e => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleVideoPick = e => {
    const f = e.target.files[0];
    if (f?.type.startsWith('video/')) {
      setVideoFile(f);
    } else {
      alert('Only video files are allowed for lesson recording.');
    }
  };

  const handleVideoDrop = e => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith('video/')) {
      setVideoFile(f);
    } else {
      alert('Only video files are allowed for lesson recording.');
    }
  };

  const handleUpload = () => {
    if (!title.trim() || !file) {
      alert('Please provide a title and select a file.');
      return;
    }
    const newMat = {
      id: Date.now(),
      title,
      description,
      file,
      video: videoFile,
      date: new Date().toLocaleDateString(),
    };
    setMaterials([newMat, ...materials]);

    // Reset form
    setTitle('');
    setDescription('');
    setFile(null);
    setVideoFile(null);
  };

  const handleDelete = id => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upload Learning Materials</h2>

      <div className={styles.form}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter material title"
        />

        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Brief description (optional)"
        />

        {/* Document Upload */}
        <div
          className={styles.dropZone}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <FaUpload size={32} className={styles.uploadIcon} />
          {file
            ? <p className={styles.fileName}>{file.name}</p>
            : <p>Drag &amp; drop file here, or click to browse</p>
          }
          <input
            id="fileInput"
            type="file"
            onChange={handleFilePick}
            className={styles.hiddenInput}
          />
        </div>

        {/* Lesson Video Upload */}
        <label className={styles.label}>Upload Lesson Video (Optional)</label>
        <div
          className={styles.dropZone}
          onDrop={handleVideoDrop}
          onDragOver={onDragOver}
          onClick={() => document.getElementById('videoInput').click()}
        >
          <FaUpload size={32} className={styles.uploadIcon} />
          {videoFile
            ? <p className={styles.fileName}>{videoFile.name}</p>
            : <p>Drag &amp; drop video here, or click to browse</p>
          }
          <input
            id="videoInput"
            type="file"
            accept="video/*"
            onChange={handleVideoPick}
            className={styles.hiddenInput}
          />
        </div>

        <button className={styles.uploadBtn} onClick={handleUpload}>
          Upload
        </button>
      </div>

      <h3 className={styles.subheading}>Uploaded Materials</h3>
      <ul className={styles.list}>
        {materials.map(mat => (
          <li key={mat.id} className={styles.listItem}>
            <FaFileAlt className={styles.fileIcon} />
            <div className={styles.info}>
              <p className={styles.matTitle}>{mat.title}</p>
              <p className={styles.matMeta}>
                {mat.file.name} &middot; {mat.date}
              </p>
              {mat.description && (
                <p className={styles.matDesc}>{mat.description}</p>
              )}
              {mat.video && (
                <video
                  controls
                  width="100%"
                  style={{ marginTop: '8px', borderRadius: '6px' }}
                >
                  <source src={URL.createObjectURL(mat.video)} type={mat.video.type} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(mat.id)}
              aria-label="Delete material"
            >
              <FaTrash />
            </button>
          </li>
        ))}
        {materials.length === 0 && (
          <p className={styles.empty}>No materials uploaded yet.</p>
        )}
      </ul>
    </div>
  );
};

export default LecturerMaterialsUpload;
