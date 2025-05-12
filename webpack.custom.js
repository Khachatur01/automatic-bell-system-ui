const path = require('path');

module.exports = {
    output: {
        filename: (pathData) => {
            /* Produce 8.3 compliant names */
            const chunkName = pathData.chunk.name;
            if (chunkName === 'main') return 'main.js';
            if (chunkName === 'polyfills') return 'poly.js';
            if (chunkName === 'runtime') return 'runtime.js';
            return 'app.js'; // Fallback
        }
    }
};
