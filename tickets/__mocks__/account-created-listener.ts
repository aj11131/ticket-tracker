export const accountCreatedListener = {
  handleMessage: jest
    .fn()
    .mockImplementation((message: { accountId: string }) => {}),
};
