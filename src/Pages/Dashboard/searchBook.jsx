import { useState } from "react";
import { Link } from "react-router-dom";



function SearchBook() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchField , serSearchField] = useState('title');

    const handleSearch = async () => {
        if (!searchValue.trim()) return;
        
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/books/search?searchField=${searchField}&searchValue=${searchValue}`);
            const data = await response.json();
            console.log(data);
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching books:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 ">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2 mb-8">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search for books..."
                        className="flex-1 px-4 py-2 outline-none text-gray-700"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <select 
                        value={searchField}
                        onChange={(e) => serSearchField(e.target.value)}
                        className="px-4 py-2 outline-none text-gray-700 border rounded-lg"
                    >
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="genre">Genre</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-transparent mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.map((book) => (
                            <Link
                                to={`/book/${book._id}/details`}
                                key={book._id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                            >
                                <div className="aspect-w-3 aspect-h-4 mb-4">
                                    <img
                                        src={book.coverImage || 'https://via.placeholder.com/300x400'}
                                        alt={book.title}
                                        className="object-cover rounded-lg w-full h-full"
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">{book.title}</h3>
                                <p className="text-gray-600 text-sm">{book.author}</p>
                            </Link>
                        ))}
                    </div>
                )}

                {searchResults.length === 0 && !isLoading && searchValue && (
                    <div className="text-center py-8 text-gray-600">
                        No books found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBook;