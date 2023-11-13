function Lists() {
    return (
        <div className="lists p-3 bg-blue-500 rounded-xl">
            <div className="flex justify-between items-center h-[10%]">
                <button>Sort by amount</button>
                <select id="filter">
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
            </div>

            <ul className="overflow-auto py-2 h-[90%] rounded-lg">
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
                <li className="bg-gray-200 rounded-lg p-2 mb-1">HIIIIIII</li>
            </ul>
        </div>
    );
}

export default Lists;
