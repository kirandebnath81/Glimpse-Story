import PropTypes from "prop-types";
import FlipMove from "react-flip-move";

import { useSelector } from "react-redux";

import CommentDropdown from "./CommentDropdown";
import CommentInput from "./CommentInput";

const VideoComments = ({ movieData }) => {
  const { profile, editedCommentId } = useSelector((state) => state.user);

  //get dropdown menu
  const viewDropdownMenu = (commentInfo) => {
    const { userEmail, id } = commentInfo;

    if (profile.email !== userEmail || editedCommentId === id) return;

    return (
      <div className="basis-[22px] h-7 relative">
        <CommentDropdown data={movieData} id={commentInfo?.id} />
      </div>
    );
  };

  return (
    <div>
      {/* top heading */}
      <div className="mb-12 opacity-95">
        {movieData?.comments?.length >= 1 ? (
          <div className="font-medium text-[15px] xs:text-[17px]">
            {movieData?.comments?.length}
            {movieData?.comments?.length > 1 ? " Comments" : " Comment"}
          </div>
        ) : (
          <div className="text-sm xs:text-base">
            Be the first one to comment
          </div>
        )}
      </div>
      {/* Create new comment */}
      <div className="flex my-14 space-x-8">
        <div className="w-8 xs:w-10 h-8 xs:h-10 rounded-full bg-sky-500 flex justify-center items-center font-bold text-lg xs:text-xl text-white">
          {profile?.email.slice(0, 1).toUpperCase()}
        </div>
        <CommentInput data={movieData} type="create" />
      </div>
      {/* display comments */}
      <FlipMove enterAnimation="fade">
        {movieData?.comments?.map((commentInfo) => (
          <div
            key={commentInfo?.id}
            className="flex justify-between items-start mb-10  space-x-4 px-1"
          >
            <div className="flex-1 flex items-start">
              <div className="basis-8 xs:basis-10 h-8 xs:h-10 rounded-full bg-sky-600 flex justify-center items-center font-semibold text-sm xs:text-lg text-white mr-3">
                {commentInfo?.userEmail.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 text-sm xs:text-base">
                {editedCommentId === commentInfo.id ? (
                  <CommentInput
                    data={movieData}
                    type="edit"
                    editedComment={commentInfo}
                  />
                ) : (
                  <div>
                    <div className="text-[13px] xs:text-sm mb-[5px] opacity-80">
                      @{commentInfo?.userEmail?.split("@")[0]}
                    </div>
                    <div className="text-[13px] xs:text-[15px] opacity-95">
                      {commentInfo?.comment}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/*dropdown menu*/}
            {viewDropdownMenu(commentInfo)}
          </div>
        ))}
      </FlipMove>
    </div>
  );
};

VideoComments.propTypes = {
  movieData: PropTypes.object,
};

export default VideoComments;
