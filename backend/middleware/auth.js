import jwt from "jsonwebtoken"

export default function auth(req, res, next) {
    try {
        const token = req.header('x-auth-token');
        // console.log(token);

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user=decoded.user;
            next();
        } catch (err) {
        return res.status(400).send('Invalid token')

        }
    } catch (err) {
        console.error(err);
        res.send('Error');
    }
}