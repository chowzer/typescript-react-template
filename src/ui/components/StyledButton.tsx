import Styled from 'styled-components';
import { Button } from '@material-ui/core';

const StyledButton = Styled(Button)`
&& {
    background-color: #7F7EFF;
    :hover {
        background-color: #7F7FBF
    }

}
`;

export default StyledButton;
