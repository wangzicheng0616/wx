const userModules = {
	state: {
		showAuthrize: false,//微信授权
		authorization:false,//校验token
		phoneAuthrized: false,//是否绑定手机号
		sessionId: null,
		recommendID: null,
		myInfo: {
		},
		//user的token值
		token:'',
		endType:-1,
		workerInfo:{}
	},
	getters: {
		myInfo: state => state.myInfo,
		endType: state => state.endType,
		workerInfo: state => state.workerInfo,
	},
	mutations: {
		updateEndType(state, val) {
			uni.setStorageSync('endType',val)
			state.endType = val;
		},
		updateToken(state, val) {
			state.token = val;
		},
		updatePhoneAuthrized(state, val) {
			state.phoneAuthrized = val;
		},
		updateShowAuthrize(state, val) {
			state.showAuthrize = val;
		},
		updateAuthorization(state, val) {
			state.authorization = val;
		},
		updateSession(state, val) {
			state.sessionId = val;
		},
		updateRecommend(state, val) {
			state.recommendID = val;
		},
		updateMyInfo(state, myInfo) {
			state.myInfo = Object.assign(state.myInfo, myInfo);
		},
		updateWorkerInfo(state, workerInfo) {
			console.log(workerInfo)
			state.workerInfo = { ...state.workerInfo, ...workerInfo };
		},
		resetWorkerInfo(state) {
			state.workerInfo = {};
		},
		resetUser(state) {
			state.myInfo = {}
		}
	}
}

export default userModules
