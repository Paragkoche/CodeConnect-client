/* eslint-disable @typescript-eslint/no-explicit-any */

import { leader_bored_api } from "../../api";
import react from "react";
const Page = () => {
  const [data, setData] = react.useState([]);
  react.useEffect(() => {
    leader_bored_api().then((data) => {
      setData(data.data.data);
    });
  }, []);
  return (
    <div className="bg-purple-950 text-white p-8 flex flex-wrap justify-center h-[100vh]">
      <div className="relative overflow-x-auto">
        <h1>Leader Board</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-white-700 uppercase bg-purple-100  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Rank
              </th>
              <th scope="col" className="px-6 py-3">
                Score
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Questions solve
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((v: any, i) => (
              <tr className="bg-purple-50 border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {i + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {v.rank}
                </th>
                <td className="px-6 py-4">{v.name}</td>
                <td className="px-6 py-4">{v.question_solve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
