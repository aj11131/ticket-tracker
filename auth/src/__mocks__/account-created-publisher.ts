export const accountCreatedPublisher = {
  successCallback: jest
    .fn()
    .mockImplementation((message: { accountId: string }) => {}),
  publishMessage: jest
    .fn()
    .mockImplementation((message: { accountId: string }) => {}),
};
