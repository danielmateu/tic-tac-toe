

export const Square = ({children, isSelected, updateBoard, index}) => {

    // const className = `square ${isSelected ? 'is-selected' : ''}`;

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div className={`square ${isSelected ? 'is-selected' : ''} hover:bg-slate-600 transition-colors`} onClick={handleClick}>
            {children}
        </div>
    )
}
