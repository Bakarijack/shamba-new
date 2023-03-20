// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract LandRegistry {
    struct LandOwnership {
        address ownerAddress;
        string ownerName;
        string ownerContactInfo;
        string landUse;
        uint taxAssessmentValue;
        uint[] transferHistory;
        string zoningAndPlanningDetails;
        string legalDetails;
        uint landSize; // added land size
        string location; // added land location
    }

    mapping (uint => LandOwnership) public landOwnerships;

    event LandOwnershipRegistered(uint propertyId, address indexed ownerAddress, string ownerName, string landUse, uint landSize, string location);
    event LandOwnershipUpdated(uint propertyId, address indexed ownerAddress, string ownerName, string landUse, uint landSize, string location);
    event LandOwnershipTransferred(uint propertyId, address indexed from, address indexed to, string newOwnerName, string newOwnerContactInfo, string thirdPartyName, string thirdPartyContactInfo);

    address public owner;// address of the contract owner

    constructor() {
        owner = msg.sender;// users/landowner address
    }

    function registerLandOwnership(
        uint _propertyId,
        string memory _ownerName,
        string memory _ownerContactInfo,
        string memory _landUse,
        uint _taxAssessmentValue,
        string memory _zoningAndPlanningDetails,
        string memory _legalDetails,
        uint _landSize,
        string memory _location
    ) public {
        require(landOwnerships[_propertyId].ownerAddress == address(0), "Property ID already registered");
        require(_taxAssessmentValue > 0, "Tax assessment value must be positive");

        uint[] memory transferHistory;

        landOwnerships[_propertyId] = LandOwnership(
            msg.sender,
            _ownerName,
            _ownerContactInfo,
            _landUse,
            _taxAssessmentValue,
            transferHistory,
            _zoningAndPlanningDetails,
            _legalDetails,
            _landSize,
            _location
        );

        emit LandOwnershipRegistered(_propertyId, msg.sender, _ownerName, _landUse, _landSize, _location);
    }

    function updateLandOwnership(
        uint _propertyId,
        string memory _ownerName,
        string memory _ownerContactInfo,
        string memory _landUse,
        uint _taxAssessmentValue,
        string memory _zoningAndPlanningDetails,
        string memory _legalDetails,
        uint _landSize,
        string memory _location
    ) public {
        LandOwnership storage ownership = landOwnerships[_propertyId];
        require(ownership.ownerAddress == msg.sender, "Unauthorized access");
        require(_taxAssessmentValue > 0, "Tax assessment value must be positive");

        ownership.ownerName = _ownerName;
        ownership.ownerContactInfo = _ownerContactInfo;
        ownership.landUse = _landUse;
        ownership.taxAssessmentValue = _taxAssessmentValue;
        ownership.zoningAndPlanningDetails = _zoningAndPlanningDetails;
        ownership.legalDetails = _legalDetails;
        ownership.landSize = _landSize;
        ownership.location = _location;

        emit LandOwnershipUpdated(_propertyId, msg.sender, _ownerName, _landUse, _landSize, _location);
    }

    function transferLandOwnership(
        uint _propertyId,
        address _newOwnerAddress,
        string memory _newOwnerName,
        string memory _newOwnerContactInfo,
        string memory _thirdPartyName,
        string memory _thirdPartyContactInfo

    ) public {
        LandOwnership storage ownership = landOwnerships[_propertyId];
        require(ownership.ownerAddress == msg.sender, "Unauthorized access");
        require(_newOwnerAddress != address(0), "New owner address is required");

        address oldOwnerAddress = ownership.ownerAddress;

        ownership.ownerAddress = _newOwnerAddress;
        ownership.ownerName = _newOwnerName;
        ownership.ownerContactInfo = _newOwnerContactInfo;
        ownership.transferHistory.push(block.timestamp);

        emit LandOwnershipTransferred(_propertyId, oldOwnerAddress, _newOwnerAddress, _newOwnerName, _newOwnerContactInfo, _thirdPartyName, _thirdPartyContactInfo);
    }
}