import { Tabs } from 'expo-router';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FB8C00',
        tabBarInactiveTintColor: '#8C8C8C',
        tabBarStyle: {
          height: 72,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fisioterapeutas"
        options={{
          title: 'Fisioterapeutas',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-md" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progresso"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="trending-up" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
