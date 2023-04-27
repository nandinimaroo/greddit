import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Navbar()
{
    return (
        <div style={{ textAlign: "center" }}>
            <a href="/profile"><HomeIcon></HomeIcon></a>
            <a href="/mysubgreddits"><ArticleIcon></ArticleIcon></a>
            <a href="/subgreddits"><MenuBookIcon></MenuBookIcon></a>
        </div>
    )
}
