function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CommentItem = ({ comment }: any) => {
  return (
    <>
      <article>
        <div className="mb-4 flex items-center space-x-4">
          <img className="h-10 w-10 rounded-full" src={comment.user.image} alt="" />
          <div className="space-y-1 font-medium ">
            <p>{comment.user.name}</p>
          </div>
        </div>
        <div className="mb-1 flex items-center">
          {Array.from([1, 2, 3, 4, 5]).map((star) => {
            return (
              <>
                <svg
                  aria-hidden="true"
                  className={classNames(
                    star > comment.rating ? "text-gray-300" : "text-yellow-400",
                    "h-5 w-5"
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </>
            );
          })}
        </div>
        <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          <p>{comment.createdAt.toDateString()}</p>
        </footer>
        <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{comment.content}</p>

        <aside>
          <div className="mt-3 flex items-center space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
            <a
              href="mailto:aladin.w22g4@gmail.com?subject=Help me"
              className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700">
              Help
            </a>
            <a
              href="mailto:aladin.w22g4@gmail.com?subject=Reports"
              className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Report abuse
            </a>
          </div>
        </aside>
      </article>
    </>
  );
};
export default CommentItem;
