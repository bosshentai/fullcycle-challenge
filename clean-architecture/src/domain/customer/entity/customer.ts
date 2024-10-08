import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity {
  // private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active = true;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
      // throw new Error(this.notification.messages());
    }
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
    // if (this._name.length === 0) {
    //   this.notification.addError({
    //     context: "customer",
    //     message: "Name is required",
    //   });
    // }
    // if (this._id.length === 0) {
    //   this.notification.addError({
    //     context: "customer",
    //     message: "Id is required",
    //   });
    // }
  }

  get name(): string {
    return this._name;
  }

  // get id(): string {
  //   return this._id;
  // }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
  get address(): Address {
    return this._address;
  }

  isActive(): boolean {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  set Address(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
