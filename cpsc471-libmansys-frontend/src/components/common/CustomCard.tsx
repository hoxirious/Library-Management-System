import "styles/components/CustomCard.sass"

interface CustomCardProps {
    title: string;
    genre: string;
}

export const CustomCard = ({title,genre}:CustomCardProps) => {
    return (
        <div className="custom-card">
            <p className = "title">Title: {title}</p>
            <p className = "genre">Genre: {genre}</p>
            <input type="checkbox"></input>
        </div>
    )
}