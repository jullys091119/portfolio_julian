import createCommentElement from "./createCommentElement.js";


const showAllComments = (allComments, index, isvisibleComments) => {
  const showCommentsContainer = document.querySelector(`.showComments-${index}`);

  Object.keys(allComments).forEach((key) => {
    const containerComment = createCommentElement(allComments[key], index, key, isvisibleComments);
    showCommentsContainer.appendChild(containerComment);
  });
};

export default showAllComments