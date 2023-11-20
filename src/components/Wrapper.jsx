import {VStack} from "@chakra-ui/react";
import Navbar from './Navbar'

function Wrapper (props) {
    return (
        <VStack>
            <Navbar minH="10vh" minW="100vw"/>
            {props.children}
        </VStack>
    )
}

export default Wrapper