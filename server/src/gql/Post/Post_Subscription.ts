import { AnyNaptrRecord } from 'dns';

const Post_Subscription = {
  Subscription: {
    newPost: {
      subscribe: async (_: any, __: AnyNaptrRecord, context: any) => {
        const { pubsub } = context;

        pubsub.asyncIterator('NEW_POST');
      },
    },
  },
};

export default Post_Subscription;
