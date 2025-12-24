// import React, { useRef } from "react";
// import BookDesign from "./BookDesign";

// function TrendingBooks({ trendingProduct = [], onBookClick }) {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const scrollAmount =
//         direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

//       scrollRef.current.scrollTo({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="relative w-full">
//       <h1 className="text-2xl font-semibold mb-4 ml-6">Trending Books</h1>

//       <button
//         onClick={() => scroll("left")}
//         className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md shadow-lg rounded-full p-2 hover:bg-gray-200"
//       >
//         <i className="bx bx-chevron-left text-2xl"></i>
//       </button>

//       <div
//         ref={scrollRef}
//         className="flex overflow-x-auto scroll-smooth gap-6 scrollbar-hide px-12"
//       >
//         {trendingProduct.map((trend) => (
//           <div key={trend.id} className="flex-shrink-0 cursor-pointer" onClick={() => onBookClick(trend)}>
//             <BookDesign trend={trend} />
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => scroll("right")}
//         className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md shadow-lg rounded-full p-2 hover:bg-gray-200"
//       >
//         <i className="bx bx-chevron-right text-2xl"></i>
//       </button>
//     </div>
//   );
// }

// export default TrendingBooks;
