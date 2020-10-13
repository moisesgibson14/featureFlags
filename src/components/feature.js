import { configureFeature, Feature, FeatureToggles } from '@paralleldrive/react-feature-toggles';
import React from 'react'
const NotFoundPage = () => <div>404</div>;
const NotFoundComponent = () => <div>Not Found</div>
const FAQComponent = () => <div>FAQ component</div>
const ChatPage = () => <div>Chat</div>;

const featureOr404 = configureFeature(NotFoundPage);
const Chat = featureOr404('bar', ChatPage);

const features = ['fa']

// const FeatureToogleApp = () => (
//   <FeatureToggles features={features}>
//     <Chat />
//   </FeatureToggles>
// );

const FeatureToogleApp = () => {
  return (
    <FeatureToggles features={features}>
      <Feature
        name="fa"
        inactiveComponent={NotFoundComponent}
        activeComponent={FAQComponent}
      />
    </FeatureToggles>
  );
};

export default FeatureToogleApp