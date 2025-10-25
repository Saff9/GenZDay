useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      } else {
        // Fallback
        setPosts([{
          id: 'fallback',
          userId: '1',
          mediaUrl: 'https://placehold.co/600x400/0088cc/white?text=Demo+Post',
          mediaType: 'image',
          caption: 'This is a demo post. Create your own!',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          views: 100,
          user: { name: 'Demo', avatar: 'DM' },
          likes: 10,
          comments: 2,
          isLiked: false
        }]);
      }
    } catch (error) {
      console.log('Using demo data due to error');
      setPosts([{
        id: 'demo',
        userId: '1',
        mediaUrl: 'https://placehold.co/600x400/25d366/white?text=GenZ+Day+Demo',
        mediaType: 'image',
        caption: 'Welcome to GenZ Day! Create posts that last 7 days.',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        views: 150,
        user: { name: 'Welcome Bot', avatar: 'WB' },
        likes: 25,
        comments: 3,
        isLiked: false
      }]);
    }
    setLoading(false);
  };

  fetchPosts();
}, []);
