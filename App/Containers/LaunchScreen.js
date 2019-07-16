// @flow

import React, { Component } from 'react'
import { ScrollView, Text, Image, View, KeyboardAvoidingView } from 'react-native'
import { Images } from '../Themes'
import { Button, Icon, Input, ThemeProvider } from 'react-native-elements'

import { Formik } from 'formik'
// import { LoginSchema } from '../Services/Validators'
// Styles
import styles from './Styles/LaunchScreenStyles'

import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  username: yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: yup.string()
    .required('Please enter your password'),
  // .required('Routing number is required'),
})


let theme = {
  Input: {
    containerStyle: {
      paddingHorizontal: 0,
    },
    inputContainerStyle:{
      backgroundColor: 'white',
      paddingHorizontal: 5,
    }
  },
};

let ValidatedInput = (props) => {
  let errorMessage = null

  if (props.errors && props.touched){
    errorMessage = props.errors
  }

  return (
    <Input
      errorMessage={errorMessage}
      {...props}
    />
  )
}

let LoginForm = (props) => {

  return (
    <Formik
        initialValues={{
          username: '',
          password: ''
         }}
        validationSchema={LoginSchema}
        onSubmit={values => props.submit(values)}
      >
      {
        ({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit,
        }) => (
          <KeyboardAvoidingView style={{flex: .30, flexDirection: 'column', justifyContent: 'space-between'}} behavior="padding" enabled>
            <ValidatedInput
              placeholder='Email'
              autoCapitalize={'none'}
              spellcheck={false}
              textContentType={'emailAddress'}

              value={values.username}
              errors={errors.username}
              touched={touched.username}

              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
            />
            <ValidatedInput
              placeholder='Password'
              textContentType={'password'}
              secureTextEntry={true}
              maxLength={10}

              value={values.password}
              errors={errors.password}
              touched={touched.password}

              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            <Button
              onPress={handleSubmit}
              title={'Log In'}
            />
          </KeyboardAvoidingView>
        )
      }
    </Formik>
  )
}

type Props = {
  className?: string,
  disabled?: boolean
};

type State = {
  authorized: boolean
}


export default class LaunchScreen extends Component<Props, State> {

  constructor(props: Object) {
    super(props);

    this.state = {
      authorized: false
    }
  }

  render () {

    return (
      <ThemeProvider theme={theme}>
        <View style={styles.mainContainer}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
          <View style={{flex: .85, justifyContent: 'center', padding: 10}}>
            <Text style={styles.sectionText}>
              {
                this.state.authorized ? 'Authorized' : 'Non-Authorized'
              }
            </Text>
            <LoginForm
              submit={
                (values) => this.setState({authorized: true})
              }
            />
          </View>
        </View>
      </ThemeProvider>
    )
  }
}
