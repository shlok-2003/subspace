const axios = require('axios');
const lodash = require('lodash');

exports.allBlogs = async (req, res) => {
    try {
        const response = await axios
            .get('https://intent-kit-16.hasura.app/api/rest/blogs', {
                headers: {
                    'x-hasura-admin-secret':
                        '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
                },
            })
            .catch((err) => console.log('Error in getting data:', err));

        if (!response.data?.blogs) {
            return res.status(404).json({
                success: false,
                message: 'No blogs found',
            });
        }

        const blogs = response.data.blogs;

        const blogCount = blogs.length;
        const blogWithLongestTitle = lodash.maxBy(
            blogs,
            (blogs) => blogs.title.length
        );
        const privateBlog = lodash.filter(blogs, (blogs) => {
            const title = blogs.title.toLowerCase();

            return title.includes('privacy');
        });
        const uniqueBlog = lodash.uniqBy(blogs, (blogs) => blogs.title);

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
        const query = req.params.query;

        const response = await axios
            .get('https://intent-kit-16.hasura.app/api/rest/blogs', {
                headers: {
                    'x-hasura-admin-secret':
                        '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
                },
            })
            .catch((err) => console.log('Error in getting data:', err));

        if (!response.data?.blogs) {
            return res.status(404).json({
                success: false,
                message: 'No blogs found',
            });
        }

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
