    import formidable from 'formidable';

    export const parseFormData = (req) => {
    const form = formidable({ multiples: true });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
        if (err) {
            reject(err);
            return;
        }
        resolve({ fields, files });
        });
    });
    };
