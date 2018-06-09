import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

// components
import HeaderTitle from './HeaderTitle.js';
import HeaderBack from './HeaderBack.js';
import HeaderNext from './HeaderNext.js';
import NineOneOne from './NineOneOne.js';
import Summary from './Summary.js';

// images
import check_img from '../assets/images/summary_icon_check-circle.png';

export default class DescriptionScreen extends React.Component {

 static navigationOptions = ({navigation}) => {
    return {
      headerBack: (
        <HeaderBack
          navigation={navigation}
          text={"< Back"}
          nav_link={"Location"}
        />
      ),
      headerTitle: (
        <HeaderTitle text={"Create A Report"}/>
      ),
      headerNext: (
        <HeaderNext 
          navigation={navigation}
          text={"Next"}
          nav_link={"Home"}
        />
      ),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      description: 'Add description here...', 
    };
  }

  render() {
    console.log('DESCRIPTION SCREEN PARAMS: ', this.props.navigation.state.params);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <NineOneOne />
          <Summary 
            icon={check_img} 
            heading={"Add Description of Issue"}
            content={"Add notes, comments, license number, etc."}
          />
        </View>
        <View style={styles.description_wrap}>
          <TextInput
            // onSubmitEditing={}
            onFocus={() => this.setState({description : ''})}
            style={styles.description}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
            underlineColorAndroid='transparent'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#585858',
  },
  description_wrap: {
    flex: 6,
  },
  description: {
    marginLeft: 10,
  },
});

