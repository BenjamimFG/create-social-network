import follow from '../../resolvers/follow';
import jest from 'jest-mock';

describe('follow', () => {
  it('should create a follow', async () => {
    const fakeFollow = {
      id: 0,
      user: 0,
      follower: 1,
    };
    const mockFollowSave = jest.fn().mockReturnValue(fakeFollow);
    const mockFollow = jest.fn().mockReturnValue({ save: mockFollowSave });
    const mockUser = { findOneAndUpdate: jest.fn() };

    const newFollow = await follow.Mutation.createFollow(
      null,
      { input: { userId: 0, followerId: 1 } },
      { Follow: mockFollow, User: mockUser }
    );

    expect(mockFollowSave).toHaveBeenCalledTimes(1);
    expect(mockUser.findOneAndUpdate).toHaveBeenCalledTimes(2);
    expect(newFollow.id).toBe(0);
    expect(newFollow.user).toBe(0);
    expect(newFollow.follower).toBe(1);
  });

  it('should delete a follow', async () => {
    const fakeFollow = {
      id: 0,
      user: 0,
      follower: 1,
    };
    const mockFollow = { findByIdAndRemove: jest.fn().mockReturnValue(fakeFollow) };
    const mockUser = { findOneAndUpdate: jest.fn() };

    await follow.Mutation.deleteFollow(
      null,
      { input: { userId: 0, followerId: 1 } },
      { Follow: mockFollow, User: mockUser }
    );

    expect(mockFollow.findByIdAndRemove).toHaveBeenCalledTimes(1);
    expect(mockUser.findOneAndUpdate).toHaveBeenCalledTimes(2);
  });
});
