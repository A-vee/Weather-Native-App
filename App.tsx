import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
export default function App() {
  // api start
  
  const [weather, setweather] = useState('');
  const [message, setmessage] = useState('');
  const [loading, setloading] = useState(false);
  const key =``;
  async function fetchdata(param: string) {
    {
      setloading(true);
      try {
        let url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${param}&aqi=no`;
        const data = await fetch(url);
        data.json().then(json => {
          if (data) {
            setloading(false);
            console.log(json);
            setweather(json);

            if (json.message == null) {
              setweather(json);
              console.log('found');

            } else {
              console.log('not found');
              setmessage('Not found');
            }
          }
        });
      } catch (e) {
        console.log('error', e);
      }
    }
  }
  // api ending

  const [showsearch, togglesearch] = useState(false);

  const [loc, setloc] = useState(['London , UK', 'Delhi , IND', 'Paris ,FRC']);

  const [inputValue, setInputValue] = useState('');
  return (
    <ScrollView scrollEnabled={true}>
      <View className="h-screen w-full">
        <Image
          blurRadius={80}
          className="w-full h-full absolute"
          source={{
            uri: 'https://i.pinimg.com/564x/97/41/fb/9741fbffb5827eab38573945bf82c9b3.jpg',
          }}
        />
        <SafeAreaView className="flex-1 z-100 relative">
          <View className="h-[7%] flex-row rounded-full mt-5 mx-5 items-center  justify-between w-[90%] bg-gray-900 opacity-50">
            <TextInput
              onChange={() => togglesearch(!showsearch)}
              onChangeText={text => setInputValue(text)}
              placeholder="Search the location"
              className="text-lg mx-5 h-[90%]"
              placeholderTextColor={'white'}
              value={inputValue}
            />

            <TouchableOpacity
              onPress={() => {
                setInputValue(''),
                  setloc(prev => [inputValue, ...prev]),
                  inputValue.length > 0 ? fetchdata(inputValue) : null,
                  showsearch === false
                    ? togglesearch(false)
                    : togglesearch(!showsearch);
              }}
              className="w-[20%] flex justify-center items-center rounded-full   mx-5 h-full ">
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
          <View className="my-20 z-10 absolute rounded-lg w-[87%] mx-7 bg-white">
            {showsearch && loc.length
              ? loc.slice(0, 3).map(index => (
                  <TouchableOpacity
                    key={Math.random()}
                    onPress={() => {
                      return setInputValue(index), togglesearch(!showsearch);
                    }}
                    className="pb-3 border-b-[0.5px] mx-2 w-[95%]  border-gray-400 pt-4  text-black">
                    <Text className="text-black text-base    mx-5 ">
                      {index}
                    </Text>
                  </TouchableOpacity>
                ))
              : null}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-1  justify-center items-center relative">
              {loading ? (
                <View className="flex-1  justify-center items-center relative">
                  <ActivityIndicator
                    className="mt-20"
                    color={'#ffffff'}
                    size={'large'}
                  />
                </View>
              ) : weather && weather.location && weather.current ? (
                <ScrollView scrollEnabled={true}>
                  
                  <View className="flex w-[100%] space-y-[2%] mt-[30%] justify-center items-center">
                    <Text>{message}</Text>
                    <Text className="font-extrabold text-5xl">
                      {weather.location.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="font-mono max-w-[70%] text-3xl p-1">
                      {weather.location.country}
                    </Text>
                    <Image
                      className="w-52 object-cover h-52"
                      source={{uri: `http:${weather.current.condition.icon}`}}
                    />
                    <Text className="text-white pt-1 text-5xl">
                      {weather.current.temp_c}&#176;C
                    </Text>

                    <Text className="font-medium text-slate-300 text-3xl">
                      {weather.current.condition.text}
                    </Text>
                    <View className="w-full flex-1 justify-center items-center relative  h-5 bg-white"></View>
                    <View className="flex-row justify-center items-center mt-10  w-full space-x-7 space-y-10">
                      {/* 2nd section   */}
                      <View className="justify-center space-x-2 items-center mt-10  flex-row">
                        <Image
                          className="w-10 h-10"
                          source={require('./images/time.png')}
                        />
                        <Text className="text-gray-400 font-light">
                          {weather.location.localtime}
                        </Text>
                      </View>
                      <View className="justify-center space-x-2 items-center  flex-row">
                        <Image
                          className="w-10 h-10"
                          source={require('./images/wind.png')}
                        />
                        <Text className="text-gray-400 font-light">
                          {weather.current.wind_kph} km/h
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-center items-center w-full space-x-20 space-y-2">
                      {/* 2nd section   */}
                      <View className="justify-center space-x-2 items-center mt-5  flex-row">
                        <Image
                          className="w-10 h-10"
                          source={require('./images/cloud1.png')}
                        />
                        <Text className="text-gray-400 font-light">
                          {weather.current.cloud} %
                        </Text>
                      </View>
                      <View className="justify-center space-x-2 items-center   flex-row">
                        <Image
                          className="w-10 h-10"
                          source={require('./images/humidity.png')}
                        />
                        <Text className="text-gray-400 font-light">
                          {weather.current.humidity} %
                        </Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              ) : (
                <ScrollView scrollEnabled={true}>
                  <View className="flex w-[100%] space-y-[2%] mt-[30%] justify-center items-center">
                  
                    <Text className="font-extrabold text-5xl">London</Text>
                    <Text
                      numberOfLines={1}
                      className="font-mono max-w-[70%] text-3xl p-1">
                      United Kingdom
                    </Text>
                    <Image
                      className="w-36 object-cover h-36"
                      source={require('./images/cloud.png')}
                    />
                    <Text className="text-white mt-5 pt-1 text-4xl">
                      23 &#176;C
                    </Text>

                    <Text className="font-medium text-slate-300 text-3xl">
                      Partly Clouds
                    </Text>
                    <View className="w-full flex-1 justify-center items-center relative  h-5 bg-white"></View>
                    <View className="flex-row justify-center items-center mt-10  w-full space-x-20 space-y-10">
                      {/* 2nd section   */}
                      <View className="justify-center space-x-2 items-center mt-10  flex-row">
                        <Image
                          className="w-10 h-10"
                          source={require('./images/time.png')}
                        />
                        <Text className="text-gray-400 font-light">Time</Text>
                      </View>
                      <View className="justify-center space-x-2 items-center  flex-row">
                        <Image
                          className="w-10 h-10"
                          source={require('./images/wind.png')}
                        />
                        <Text className="text-gray-400 font-light">
                          Wind-Speed
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row justify-center items-center w-full space-x-20 space-y-2">
                      {/* 2nd section   */}
                      <View className="justify-center space-x-2 items-center mt-5  flex-row">
                        <Image
                          className="w-10 h-10"
                          source={require('./images/cloud1.png')}
                        />
                        <Text className="text-gray-400 font-light">Clouds</Text>
                      </View>
                      <View className="justify-center space-x-2 items-center   flex-row">
                        <Image
                          className="w-10 h-10"
                          source={require('./images/humidity.png')}
                        />
                        <Text className="text-gray-400 font-light">
                          Humidity
                        </Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}
