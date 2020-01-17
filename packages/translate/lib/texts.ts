export const texts = Object.freeze({
	'startupError.blasterError': () => 'Cannot continue: IR blaster missing or incorrectly attached',
	'startupError.blasterError.desc': () => 'Infrared blaster assigned to the device is missing or malfunctioning. Check the wiring, replace the blaster or assign another working CandyBox port to this device',
	'startupError.bootstrappedPlatformError': () => 'Cannot continue: Suitest bootstrap app is not running',
	'startupError.bootstrappedPlatformError.desc': () => 'Suitest tried to start the bootstrap application on this device but failed several times and will try no more. Please connect to the device and start the bootstrap app manually, then disconnect and the scheduled test will continue. If you have configured the Suitest channel, tune the TV to this channel and verify that Suitest badge is displayed on TV in the top right corner. If you have not configured the Suitest channel, please contact support',
	'startupError.testQueued': () => 'Test is added to queue',
	'startupError.testQueued.desc': () => 'Execution will start as soon as other tests queued on this device will finish execution',
	'startupError.noAvailableAutomatedMinutes': () => 'Cannot continue: you\'ve used up all of your testing minutes',
	'startupError.noAvailableAutomatedMinutes.desc': () => 'You testing a lot! How about [getting a bigger subscription](https://the.suite.st/preferences/billing)? Or, if you would like to purchase more testing minutes for the current billing cycle, please contact [sales@suite.st](mailto:sales@suite.st). Your testing minutes will renew',
	'startupError.noActivePlan': () => 'Cannot continue: Your subscription has expired',
	'startupError.noActivePlan.desc': () => 'Your subscription has expired, to continue using Suitest please [renew your subscription](https://the.suite.st/preferences/billing)',
	'startupError.candyBoxOffline': () => 'Cannot continue: CandyBox controlling this device is offline',
	'startupError.candyBoxOffline.desc': () => 'Check that the cable plugged into the CandyBox delivers Internet connection or reboot the CandyBox and allow about 5 minutes for it to initialize',
	'startupError.suitestDriveOffline': () => 'Cannot continue: SuitestDrive controlling this device is offline',
	'startupError.suitestDriveOffline.desc': () => 'SuitestDrive controlling this device is not currently running or is offline. Please verify that the host computer has Internet connection and that SuitestDrive is running',
	'startupError.suitestDriveServiceOffline': () => 'The SuitestDrive process is not running on the CandyBox.',
	'startupError.runningBootSequence': () => 'Trying to open Suitest bootstrap application',
	'startupError.runningBootSequence.desc': () => 'Test will start after the Suitest bootstrap application will open. Suitest will attempt to open the app in a number of ways. After each attempt it will wait for 60 seconds for the app to respond. If it will not, Suitest will try the next available method. Current methods are: 1) Sending EXIT key to the device, 2) Executing user defined boot sequence, 3) turning the TV on and off 4) Turning the TV on again. If starting the test takes a long time, you should configure a better boot sequence',
	'startupError.deviceInUse': () => 'A user is currently connected to this device',
	'startupError.deviceInUse.desc': () => 'Execution will continue after the user disconnects',
	'startupError.deviceDisabled': () => 'This device is disabled',
	'startupError.deviceDisabled.desc': () => 'For the execution to continue please enable the device',
	'startupError.deviceDeleted': () => 'Cannot continue: Device is deleted',
	'startupError.deviceDeleted.desc': () => 'The device on which the execution was scheduled has been deleted. Please cancel the test and schedule it on another available device',
	'startupError.internalError': () => 'Cannot continue: Internal error occurred',
	'startupError.internalError.desc': () => 'We are very sorry, but some fishy error occurred when Suitest was trying to execute your test. Our developers have been notified and are already working hard to resolve the problem',
	'startupError.notDefinedPlatform': () => 'Cannot continue: Device does not support this platform',
	'startupError.notDefinedPlatform.desc': () => 'You have scheduled the test execution with a configuration that depends on a platform, which this device does not currently support. You should either configure the platform on the device or cancel the test run',
	'startupError.lgWebosPlatformError': () => 'Cannot continue: LG WebOS driver has failed',
	'startupError.lgWebosPlatformError.desc': () => 'LG WebOS driver has misbehaved. Please verify that the device is online and it\'s current IP address is correctly specified in Suitest. Then double check if the Development mode is enabled on the device. If nothing helps try rebooting the device',
	'startupError.xboxPlatformError': () => 'Cannot continue: Xbox driver has failed',
	'startupError.xboxPlatformError.desc': () => 'Xbox driver has misbehaved. Please verify that the device is online and it\'s current IP address and developer credentials are correctly specified in Suitest. If nothing helps try rebooting the device and restarting SuitestDrive',
	'startupError.androidPlatformError': () => 'Cannot continue: Android driver has failed',
	'startupError.androidPlatformError.desc': () => 'Android driver has misbehaved. Please verify that the device is online and it\'s current IP address is correctly specified in Suitest. If nothing helps try rebooting the device and restarting SuitestDrive',
	'startupError.applePlatformError': () => 'Cannot continue: Apple TV driver has failed',
	'startupError.applePlatformError.desc': () => 'Apple driver has misbehaved. Please verify that the device is paired with Mac that is running SuitestDrive. Make sure that application build is installable on that device. If nothing helps try rebooting the device and restarting SuitestDrive',
	'startupError.rokuPlatformError': () => 'Cannot continue: Roku driver has failed',
	'startupError.rokuPlatformError.desc': () => 'Roku driver has misbehaved. Please verify that the device is online and it\'s current IP address and developer credentials are correctly specified in Suitest. Then double check if the Development mode is enabled on the device and your channel/application is valid. If the local IP of the device changes, make sure to set up a static IP for the device',
	'startupError.playstationPlatformError': () => 'Cannot continue: PlayStation 4 driver has failed',
	'startupError.playstationPlatformError.desc': () => 'PlayStation 4 driver has misbehaved. Please verify that the device is online and it\'s current IP address is correctly specified in Suitest. If nothing helps try rebooting the device and restarting SuitestDrive. If the local IP of the device changes, make sure to set up a static IP for the device.',
	'startupError.planLimitExceeded': () => 'Application or user limit has been exceeded',
	'startupError.planLimitExceeded.desc': () => 'Looks like you have reached the limit of applications or users, check your [billing section](https://the.suite.st/preferences/billing) to increase your plan. Please contact [sales@suite.st](sales@suite.st) if you require help with your plan.',
	'startupError.packageCorrupted': () => 'Failed to open the app. Please make sure that your app is working correctly.',
	'startupError.unknownReason': (reason: string) => `Unknown not started reason received: ${reason}`,

	'progress.status.openingApp': () => 'Trying to open app…',
	'progress.status.closingApp': () => 'Trying to close app…',
	'progress.status.bootingDevice': () => 'Running the boot sequence defined for the device…',
	'progress.status.needManual': () => 'Paused. For this platform, install and open the application manually.',
	'progress.status.recoveringID': () => 'Trying to recover Suitest device ID…',
	'progress.status.waitingForConnectionFromBootstrap': () => 'Waiting for connection from the Suitest app on device…',
	'progress.status.waitingForConnectionFromIL': () => 'Waiting for connection from the instrumentation library…',
	'progress.status.unistallingApp': () => 'Uninstalling app…',
	'progress.status.uploadingAndInstallingApp': () => 'Uploading and installing app…',
	'progress.status.unknownStatusCode': (code: string) => `Unknown status code received: ${code}`,
	'progress.status.actionFailedNoCode': () => 'A code is expected when receiving "actionFailed" progress status',
	'progress.status.undefined': () => 'A status is expected.'
});

export default texts;
