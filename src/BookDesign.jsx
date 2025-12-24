import React, { useContext } from "react"; // import React and useContext hook
import { UserContext } from "./context/UserContext"; // import your context


function BookDesign({ trend }) {
   const { user, setUser } = useContext(UserContext);
  const cartSubmit = async (ProductId) => {
    try {
      const res = await axios.post("http://localhost:8080/api/cartAdd/{ProductId}",user.id);
      // setTrendingProducts(res.data || []);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching trending books:", err);
    }
  };
  return (
    <div className="lg:w-[210px] w-[150px] h-[360px] lg:h-[420px] gap-6 bg-white rounded-xl shadow p-2 lg:p-4 flex-row items-center justify-center">
      <div className="">
        <center>        <img
          src={trend.coverImage}
          className="lg:h-[250px] w-[140px] h-[200px] lg:w-[170px] rounded-xl  cursor-pointer shadow-2xl"
          alt={trend.title}
        /></center>
        </div>
        <div>
          <center><span className="font-semibold text-md lg:text-xl mb-2 block mt-4">{trend.title}</span></center>
        </div>
        <div className="mt-4 lg:mt-2">
            
          <center>
          <span className="text-lg lg:text-xl m-2 font-bold text-green-600">
              ₹{trend.newPrice}
            </span>
            <del className="mr-3 text-gray-500 text-md">
              ₹{trend.oldPrice}
            </del>
          </center>
            {/* </center> */}
          </div>
      </div>
  );
}

export default BookDesign;
