// Navigation functions
function navigateBack() {
  window.history.back();
}

function navigateForward() {
  window.history.forward();
}

function refreshPage() {
  location.reload();
}

function goHome() {
  window.location.href = "index.html";
}

// Add $IE to wallet (placeholder functionality)
function addToWallet() {
  window.open(
    "https://dexscreener.com/solana/HU9TSBH3HsY1GFAtCNsAX2B5jCvt7D8WFR29ioL54rgn"
  );
}

const stakingTiers = {
  dialup: { min: 100, apy: 0.02 },
  dsl: { min: 500, apy: 0.05 },
  fiber: { min: 1000, apy: 0.08 },
  broadband: { min: 5000, apy: 0.12 }
};

let userStaking = {
  tier: null,
  amount: 0,
  startTime: null,
  rewards: 0
};

// Function to validate staking input
function validateStaking(tier, amount) {
  if (!stakingTiers[tier]) {
    throw new Error('Invalid staking tier');
  }
  
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Invalid staking amount');
  }
  
  if (amount < stakingTiers[tier].min) {
    throw new Error(Minimum stake for ${tier.toUpperCase()} tier is ${stakingTiers[tier].min} $IE);
  }
  
  return true;
}

// Function to calculate rewards
function calculateRewards(amount, apy, elapsedDays) {
  return (amount * apy * elapsedDays) / 365;
}

// Function to stake tokens
async function stakeTokens() {
  try {
    const tier = document.getElementById("tier-select")?.value;
    const amount = parseFloat(document.getElementById("stake-amount")?.value);

    validateStaking(tier, amount);

    // Simulate staking transaction (Replace with Solana smart contract call)
    userStaking = {
      tier: tier,
      amount: amount,
      startTime: Date.now(),
      rewards: 0
    };

    localStorage.setItem("userStaking", JSON.stringify(userStaking));
    updateStakingStatus();
    
    return true;
  } catch (error) {
    alert(error.message);
    return false;
  }
}

// Function to update staking info display
function updateStakingStatus() {
  if (!userStaking.startTime) return;

  const currentTime = Date.now();
  const elapsedDays = (currentTime - userStaking.startTime) / (1000 * 60 * 60 * 24);
  const tierData = stakingTiers[userStaking.tier];

  userStaking.rewards = calculateRewards(userStaking.amount, tierData.apy, elapsedDays);

  const stakingStatus = document.getElementById("staking-status");
  if (!stakingStatus) return;

  stakingStatus.innerHTML = 
    <strong>Tier:</strong> ${userStaking.tier.toUpperCase()} <br>
    <strong>Amount Staked:</strong> ${userStaking.amount.toFixed(2)} $IE <br>
    <strong>Rewards Earned:</strong> ${userStaking.rewards.toFixed(2)} $IE <br>
    <strong>Staked Since:</strong> ${new Date(userStaking.startTime).toLocaleDateString()}
  ;
}

// Load saved staking info on page load
window.addEventListener("DOMContentLoaded", function () {
  try {
    const savedStaking = localStorage.getItem("userStaking");
    if (savedStaking) {
      userStaking = JSON.parse(savedStaking);
      updateStakingStatus();
    }
  } catch (error) {
    console.error('Error loading staking data:', error);
  }
});

// Optional: Add automatic updates every minute
setInterval(updateStakingStatus, 60000);