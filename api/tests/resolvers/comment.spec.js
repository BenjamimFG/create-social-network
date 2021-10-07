import comment from '../../resolvers/comment.js';
import jest from 'jest-mock';

describe('comment', () => {
  it('should create a comment', async () => {
    const fakeComment = {
      id: 0,
      comment: 'Test Comment',
      post: 1,
      author: 2,
    };
    const mockCommentSave = jest.fn().mockReturnValue(fakeComment);
    const mockComment = jest.fn().mockReturnValue({ save: mockCommentSave });
    const mockPost = { findOneAndUpdate: jest.fn() };
    const mockUser = { findOneAndUpdate: jest.fn() };

    const newComment = await comment.Mutation.createComment(
      null,
      { input: { comment: 'test', author: 'test', postId: 0 } },
      { Comment: mockComment, Post: mockPost, User: mockUser }
    );

    expect(mockCommentSave).toHaveBeenCalledTimes(1);
    expect(newComment.id).toBe(0);
    expect(newComment.comment).toBe('Test Comment');
    expect(newComment.post).toBe(1);
    expect(newComment.author).toBe(2);
  });

  it('should delete a comment', async () => {
    const mockComment = { findByIdAndRemove: jest.fn().mockReturnValue({ author: 0, post: 1 }) };
    const mockPost = { findOneAndUpdate: jest.fn() };
    const mockUser = { findOneAndUpdate: jest.fn() };

    await comment.Mutation.deleteComment(
      null,
      { input: { id: 0 } },
      { Comment: mockComment, Post: mockPost, User: mockUser }
    );

    expect(mockComment.findByIdAndRemove).toHaveBeenCalledTimes(1);
    expect(mockPost.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(mockUser.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });
});
