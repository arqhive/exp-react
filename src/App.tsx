import React, { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';
import Root from './recoil/Todo';


function App(): ReactElement {
  return (
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  );
}

export default App;
