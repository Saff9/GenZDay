  const handleUpload = async () => {
  if (!file) return;

  setIsUploading(true);
  try {
    // Step 1: Upload file
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: file.name,
        type: file.type,
        size: file.size
      }),
    });

    const uploadData = await uploadResponse.json();

    if (uploadData.success) {
      // Step 2: Create post with the uploaded file URL
      const postResponse = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mediaUrl: uploadData.data.url,
          mediaType: file.type.startsWith('image/') ? 'image' : 'video',
          caption: caption
        }),
      });

      const postData = await postResponse.json();

      if (postData.success) {
        alert('Posted successfully! 🎉\nRefresh the page to see your post in the feed.');
        onClose();
        setFile(null);
        setCaption('');
        setPreview('');
        
        // Refresh the page to show new post
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        alert('Failed to create post: ' + postData.error);
      }
    } else {
      alert('Upload failed: ' + uploadData.error);
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('Upload failed. Please try again.');
  }
  setIsUploading(false);
};
