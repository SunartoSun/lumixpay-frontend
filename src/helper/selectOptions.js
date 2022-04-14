export const STATUS_APPROVE = 1;
export const STATUS_REJECT = 2;
export const STATUS_CANCEL = 3;

export const OptionMerchantStatus = [
  { value: 'active', label: 'Active' },
  { value: 'suspend', label: 'Suspend' },
];

export const OptionTransactionStatus = [
  { value: 'All', label: 'All' },
  { value: 'Success', label: 'Success' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Failed', label: 'Failed' },
];

export const OptionsDateRange = [
  { value: 0, label: 'Daily' },
  { value: 1, label: 'Weekly' },
  { value: 2, label: 'Monthly' },
];

export const OptionItemSelect = { label: 'Items per page:', values: [10, 20, 50, 100] };

export const OptionStatus = [
  { value: 0, label: 'Pending' },
  { value: 1, label: 'Approved' },
  { value: 2, label: 'Rejected' },
  { value: 3, label: 'Cancelled' },
];

export const OptionWallet = [
  { value: 'gold', label: 'gold' },
  { value: 'silver', label: 'silver' },
];

export const OptionClaimStatus = [
  { value: '0', label: 'Pending' },
  { value: '1', label: 'Approved' },
];

export const OptionAccountStatus = [
  { value: 'enabled', label: 'Enabled' },
  { value: 'disabled', label: 'Disabled' },
];

export const OptionCommissionPercent = [
  { value: 1, label: '1%' },
  { value: 2, label: '2%' },
  { value: 3, label: '3%' },
  { value: 4, label: '4%' },
  { value: 5, label: '5%' },
  { value: 6, label: '6%' },
  { value: 7, label: '7%' },
  { value: 8, label: '8%' },
  { value: 9, label: '9%' },
  { value: 10, label: '10%' },
];

export const OptionAccountType = [
  { value: 'user', label: 'User' },
  { value: 'beta', label: 'Beta' },
];

export const OptionGameId = [
  { value: '', label: 'All' },
  { value: 1, label: 'Tower' },
  { value: 2, label: 'Crash Game' },
];

export const OptionBetStatus = [
  { value: 2, label: 'Lose' },
  { value: 4, label: 'Win' },
];

export const OptionUserType = [
  { value: 'PUBLIC', label: 'PUBLIC' },
  { value: 'Agent L1', label: 'Agent L1' },
  { value: 'Agent L2', label: 'Agent L2' },
  { value: 'Agent L3', label: 'Agent L3' },
];

export const OptionAgentLod = [
  { value: 0, label: '0%' },
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
  { value: 15, label: '15%' },
  { value: 20, label: '20%' },
  { value: 25, label: '25%' },
  { value: 30, label: '30%' },
];

export const OptionReferralType = [
  { value: '', label: 'All' },
  { value: 'DAILY', label: 'DAILY' },
  { value: 'LOD', label: 'LOD' },
];

export const OptionCurrency = [
  { value: 'CASH', label: 'CASH' },
  { value: 'USDT', label: 'USDT' },
  { value: 'ETH', label: 'ETH' },
];

export const OptionWalletSubType = [
  { value: '', label: 'All' },
  { value: 'Bet', label: 'Bet' },
  { value: 'Deposit', label: 'Deposit' },
  { value: 'Withdrawal', label: 'Withdrawal' },
  { value: 'Commission', label: 'Commission' },
  { value: 'Event', label: 'Event' },
  { value: 'Vip', label: 'Vip' },
  { value: 'Other', label: 'Other' },
];
