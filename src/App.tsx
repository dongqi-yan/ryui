import React from 'react';
import Button, { ButtonType, ButtonSize} from './components/Button';
import Alert from './components/Alert';
import Menu from './components/Menu';
import UserForm from './userForm';
const { MenuItem, SubMenu } = Menu;

const App: React.FC<any> = (props) => {

  return (
    <div className="App">
      <header style={{padding: '0 10px'}}>
        <Menu onSelect={index => console.log(index)} mode='horizontal' defaultOpenMenus={['3']}>
          <MenuItem>菜单1</MenuItem>
          <MenuItem>菜单2</MenuItem>
          <MenuItem>菜单3</MenuItem>
          <SubMenu title='二级菜单'>
            <MenuItem>下拉1</MenuItem>
            <MenuItem>下拉2</MenuItem>
          </SubMenu>
        </Menu>
      </header>
      <br />
      <br />
      <hr />
      <Button disabled>disabled</Button>
      <Button>default</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        PL
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        PL
      </Button>
      <Button btnType={ButtonType.Link} href='http://www.baidu.com'> 
        Link
      </Button>
      <br />
      <Alert message='alert' description='description' closable type='warning'/>
      <br />
      <UserForm />
    </div>
  );
}

export default App;
