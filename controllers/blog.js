const axios = require('axios');
const lodash = require('lodash');

exports.allBlogs = async (req, res) => {
    try {
        // getting response from the api
        const response = await axios
            .get('https://intent-kit-16.hasura.app/api/rest/blogs', {
                headers: {
                    'x-hasura-admin-secret':
                        '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
                },
            })
            .catch((err) => console.log('Error in getting data:', err));
        
        // if no data is found
        if (!response.data?.blogs) {
            return res.status(404).json({
                success: false,
                message: 'No blogs found',
            });
        }

        // getting blogs from the response
        const blogs = response.data.blogs;

        // getting all the necessary data
        const blogCount = blogs.length;                                     // total number of blogs
        const blogWithLongestTitle = lodash.maxBy(                          // blog with longest title
            blogs,
            (blogs) => blogs.title.length       
        );      
        const privateBlog = lodash.filter(blogs, (blogs) => {               // private blogs
            const title = blogs.title.toLowerCase();

            return title.includes('privacy');
        });
        const uniqueBlog = lodash.uniqBy(blogs, (blogs) => blogs.title);    // unique blogs

        // creating the response object
        const ans = {
            blogCount,
            blogWithLongestTitle,
            privateBlog,
            uniqueBlog,
        };

        res.send(ans);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: 'Internal Server Error',
        });
    }
};

exports.searchBlog = async (req, res) => {
    try {
        // getting query from the request
        const query = req.params.query;

        const response = await axios
            .get('https://intent-kit-16.hasura.app/api/rest/blogs', {
                headers: {
                    'x-hasura-admin-secret':
                        '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
                },
            })
            .catch((err) => console.log('Error in getting data:', err));
        
        // if no data is found
        if (!response.data?.blogs) {
            return res.status(404).json({
                success: false,
                message: 'No blogs found',
            });
        }

        // getting blogs from the response
        const blogs = response.data.blogs;
        const searchResult = lodash.filter(blogs, (blogs) => {
            let title = blogs.title.toLowerCase();
            return title.includes(query);
        });
    
        const ans = { query, searchResult };

        res.send(ans);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: 'Internal Server Error',
        });
    }
};
