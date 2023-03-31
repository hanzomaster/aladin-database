import { User } from "@prisma/client";

const UsersList = ({
  usersData,
  handleActive,
}: {
  usersData: User[];
  handleActive: (id: string, status: boolean) => void;
}) => {
  return (
    <div className=" mb-10 w-full">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>; */}
      <table className="w-full">
        <thead className="border-b bg-white">
          <tr>
            <th
              scope="col"
              className="px-2 py-3 text-left text-sm font-medium text-gray-900 md:px-6 md:text-base">
              #
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Mã số
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Họ tên
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Email
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Số điện thoại
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-base font-medium text-gray-900 md:px-6">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {usersData?.map((user, index) => {
            return (
              <tr
                key={index}
                className="border-b bg-white text-sm transition duration-300 ease-in-out hover:bg-gray-100 md:text-base">
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{index + 1}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{user.id}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{user.name}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{user.email}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">{user.phone}</td>
                <td className="whitespace-nowrap px-2 py-3 md:px-6">
                  <button
                    className={`${
                      user.status === true ? "bg-green-500" : "bg-red-500"
                    } rounded-md px-2 py-1 text-xs font-medium text-white`}
                    onClick={() => handleActive(user.id, user.status)}>
                    {user.status === true ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
