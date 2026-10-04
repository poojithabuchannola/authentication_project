import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export const uploadImage = async (file) => {
    try {
        const response = await imagekit.files.upload({
            file: file.buffer.toString("base64"),
            fileName: file.originalname
        });

        return response;
    } catch (error) {
        console.error("ImageKit upload error:", error);
        throw error;
    }
};