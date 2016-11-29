import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default mapStateToProps => {
    return target => connect(mapStateToProps, mapDispatchToProps)(target)
}
