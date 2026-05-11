import axios from "axios";

export const fetchQuote = async () => {
try {


const response = await axios.get(
  "https://dummyjson.com/quotes/random"
);

return response.data.quote;


} catch (error) {


console.error("Quote fetch failed");

return "Practice typing every day to improve your speed";


}
};
