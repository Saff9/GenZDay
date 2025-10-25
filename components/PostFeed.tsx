const fetchPosts = async () => {
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    
    if (data.success) {
      setPosts(data.data);
    } else {
      // Fallback to sample data if API fails
      console.log('Using fallback sample data');
      setPosts([
        {
          id: '1',
          userId: '1',
          mediaUrl: 'https://placehold.co/600x400/0088cc/white?text=Welcome+to+GenZ+Day+🎉',
          mediaType: 'image',
          caption: 'Welcome to GenZ Day! Your moments disappear in 7 days ⏰',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          views: 156,
          user: { name: 'GenZ Team', avatar: 'GZ' },
          likes: 23,
          comments: 5,
          isLiked: false
        }
      ]);
    }
  } catch (error) {
    console.error('Failed to fetch posts, using sample data');
    // Fallback sample post
    setPosts([
      {
        id: 'fallback-1',
        userId: '1',
        mediaUrl: 'https://placehold.co/600x400/25d366/white?text=Demo+Post+📸',
        mediaType: 'image',
        caption: 'This is a demo post. Create your own to see it here!',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        views: 89,
        user: { name: 'Demo User', avatar: 'DU' },
        likes: 15,
        comments: 2,
        isLiked: false
      }
    ]);
  }
  setLoading(false);
};
