/**
 * Copyright 2018 Simon Edwards <simon@simonzone.com>
 */

import { WebComponent } from 'extraterm-web-component-decorators';

import { GeneralSettingsUi } from './GeneralSettingsUi';
import { GeneralConfig, SystemConfig, ConfigKey, GENERAL_CONFIG, SYSTEM_CONFIG } from '../../Config';
import { Logger, getLogger } from "extraterm-logging";
import { log } from "extraterm-logging";
import { SettingsBase } from './SettingsBase';

export const GENERAL_SETTINGS_TAG = "et-general-settings";

@WebComponent({tag: GENERAL_SETTINGS_TAG})
export class GeneralSettings extends SettingsBase<GeneralSettingsUi> {
  private _log: Logger = null;

  constructor() {
    super(GeneralSettingsUi, [GENERAL_CONFIG, SYSTEM_CONFIG]);
    this._log = getLogger(GENERAL_SETTINGS_TAG, this);
  }

  protected _setConfig(key: ConfigKey, config: any): void {
    const ui = this._getUi();
    if (key === GENERAL_CONFIG) {
      const generalConfig = <GeneralConfig> config;

      if (ui.showTips !== generalConfig.showTips) {
        ui.showTips = generalConfig.showTips;
      }
      
      // We take care to only update things which have actually changed.
      if (ui.maxScrollbackLines !== generalConfig.scrollbackMaxLines) {
        ui.maxScrollbackLines = generalConfig.scrollbackMaxLines;
      }

      if (ui.maxScrollbackFrames !== generalConfig.scrollbackMaxFrames) {
        ui.maxScrollbackFrames = generalConfig.scrollbackMaxFrames;
      }
      if (ui.autoCopySelectionToClipboard !== generalConfig.autoCopySelectionToClipboard) {
        ui.autoCopySelectionToClipboard = generalConfig.autoCopySelectionToClipboard;
      }

      if ((ui.gpuDriverWorkaroundFlag ? "no_blend" : "none") !== generalConfig.gpuDriverWorkaround) {
        ui.gpuDriverWorkaroundFlag = generalConfig.gpuDriverWorkaround === "no_blend";
      }
      if (ui.isHardwareAccelerated !== generalConfig.isHardwareAccelerated) {
        ui.isHardwareAccelerated = generalConfig.isHardwareAccelerated;
      }
    } else if (key === SYSTEM_CONFIG) {
      const systemConfig = <SystemConfig> config;
      ui.systemIsHardwareAccelerated = systemConfig.isHardwareAccelerated;
    }
  }

  protected _dataChanged(): void {
    const newGeneralConfig = this._getConfigCopy(GENERAL_CONFIG);
    const ui = this._getUi();

    newGeneralConfig.showTips = ui.showTips;
    newGeneralConfig.scrollbackMaxLines = ui.maxScrollbackLines;
    newGeneralConfig.scrollbackMaxFrames = ui.maxScrollbackFrames;
    newGeneralConfig.autoCopySelectionToClipboard = ui.autoCopySelectionToClipboard;
    newGeneralConfig.gpuDriverWorkaround = ui.gpuDriverWorkaroundFlag ? "no_blend" : "none";
    newGeneralConfig.isHardwareAccelerated = ui.isHardwareAccelerated;

    this._updateConfig(GENERAL_CONFIG, newGeneralConfig);
  }
}
