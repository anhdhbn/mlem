/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import signUP from './authScreen/signUp/signUp';
import signIn from './authScreen/signIn/signIn';
import mainBody from './main/mainBody'
AppRegistry.registerComponent(appName, () => mainBody);
