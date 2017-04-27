export const AnswerModel =
  ({
    key = null,
    body = null,
    edited = false,
    editedBy = null,
    editedLast = null,
    user = {},
    likes = null,
    createdAt = null,
    issueId = null
  }) => {
  return {
    key,
    body,
    edited,
    editedBy,
    editedLast,
    user,
    likes,
    createdAt,
    issueId
  }
};

