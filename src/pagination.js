
const Pagination = ({ count, setPage }) => {
    const countPages = Math.ceil(count / 5);

    const paginationButtons = []
    for (let i = 1; i <= countPages; i++) {
        paginationButtons.push(<button onClick={() => setPage(i)} className="pagination-button">{i}</button>)
    }

    return count > 5 ? (<div className="pagination-wrapper">
        <button className="pagination-button" onClick={() => setPage(1)}> {"<<"}</button>
        {paginationButtons}
        <button className="pagination-button" onClick={() => setPage(countPages)}>{">>"}</button>
    </div>) : <></>
}

export default Pagination