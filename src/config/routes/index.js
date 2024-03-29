import{
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import PrivateNavigation from './Private'
import PublicNavigation from './Guest'
import Loading from './Loading'
const RootNav = createSwitchNavigator({
  LoadingScreen : {
    screen : Loading
  },
  PrivateNavigation: PrivateNavigation,
  PublicNavigation: PublicNavigation
})


export default createAppContainer(RootNav);
