import app from "./app/app.js";
import connectDB from "./config/db.js";
import config from "./config/config.js";

const PORT = config.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});