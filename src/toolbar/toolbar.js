import {BalloonToolbar, HeadingToolbar, ToolbarButton} from "@udecode/plate-toolbar";
import {
    ToolbarCodeBlock,
    ToolbarColorPicker,
    ToolbarElement,
    ToolbarImage,
    ToolbarLink,
    ToolbarList,
    ToolbarMark,
    ToolbarSearchHighlight,
    ToolbarTable,
} from '@udecode/plate'
import React from "react";
import {getPlatePluginType, useEventEditorId, useStoreEditorRef} from "@udecode/plate-core";
import {MARK_BOLD, MARK_ITALIC, MARK_UNDERLINE} from "@udecode/plate-basic-marks";
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined';
import {FontDownload, FormatBold, FormatColorText, FormatItalic} from "@styled-icons/material";
import {
    ToolbarButtonsAlign,
    ToolbarButtonsBasicElements,
    ToolbarButtonsBasicMarks,
    ToolbarButtonsList,
    ToolbarButtonsTable, ToolbarHighlight, ToolbarKbd
} from "./config";
import {MARK_BG_COLOR, MARK_COLOR} from "@udecode/plate-font";
import {Image, Link} from "@styled-icons/boxicons-regular";
import {EDITABLE_VOID} from "../plugins/field/defaults";

export const HeadingToolbarMarks = () => {
    const editor = useStoreEditorRef(useEventEditorId('focus'));
    return (
        <HeadingToolbar>
            <ToolbarButtonsBasicElements />
            <ToolbarButtonsList />
            <ToolbarButtonsBasicMarks />
            <ToolbarHighlight />
            <ToolbarColorPicker
                pluginKey={MARK_COLOR}
                icon={<FormatColorText />}
            />

            <ToolbarColorPicker
                pluginKey={MARK_BG_COLOR}
                icon={<FontDownload />}
            />
            <ToolbarKbd />
            <ToolbarButtonsAlign />
            <ToolbarLink icon={<Link />} />
            <ToolbarImage icon={<Image />} />
            <ToolbarButtonsTable />
            <ToolbarElement type={getPlatePluginType(editor, EDITABLE_VOID)}
                            icon="N"
                            />
        </HeadingToolbar>
    )
}
export const BallonToolbarMarks = () => {
    const editor = useStoreEditorRef(useEventEditorId('focus'));

    const arrow = false;
    const theme = 'dark';
    const direction = 'top';
    const hiddenDelay = 0;
    const tooltip = {
        arrow: true,
        delay: 0,
        duration: [200, 0],
        hideOnClick: false,
        offset: [0, 17],
        placement: 'top',
    };

    return (
        <BalloonToolbar
            direction={direction}
            hiddenDelay={hiddenDelay}
            theme={theme}
            scrollContainer={document}
            arrow={arrow}
        >
            <ToolbarMark
                type={getPlatePluginType(editor, MARK_BOLD)}
                icon={<FormatBold />}
                tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
            />
            <ToolbarMark
                type={getPlatePluginType(editor, MARK_ITALIC)}
                icon={<FormatItalic />}
                tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
            />
            <ToolbarMark
                type={getPlatePluginType(editor, MARK_UNDERLINE)}
                icon={<FormatUnderlined />}
                tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
            />
        </BalloonToolbar>
    );
};