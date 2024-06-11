// ** Routes Imports
import AuthenticationRoutes from '../../modules/authentication/route'
import HomeRoutes from '@modules/home/route'
import AccountsRoutes from '../../modules/menu/accountsRoutes'
import CreditRoutes from '../../modules/menu/creditRoutes'
import GatewayRoutes from '../../modules/menu/gatewayRoutes'
import SenderRoutes from '../../modules/menu/senderRoutes'
import ConnectionRoutes from '../../modules/menu/connectionRoutes'
import RequestSenderRoutes from '../../modules/menu/requestSenderRoutes'
import FTPConfigRoutes from '../../modules/menu/ftpConfigRoutes'
import ConfigBillingRoutes from '../../modules/menu/configBillingRoutes'

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template"

// ** Default Route
const DefaultRoute = "/accounts"

// ** Merge Routes
const Routes = [
  ...AuthenticationRoutes,
  ...HomeRoutes,
  ...AccountsRoutes,
  ...CreditRoutes,
  ...GatewayRoutes,
  ...SenderRoutes,
  ...ConnectionRoutes,
  ...RequestSenderRoutes,
  ...FTPConfigRoutes,
  ...ConfigBillingRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
