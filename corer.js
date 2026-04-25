// ==UserScript==
// @name         Universal Prompt Manager (Templates + Variables + Full Sync+шаблоны+токены+теги+makdown+версии с правильной нумерацией+поиск по тэгам (list и часть word, масса undo)
// @namespace    http://tampermonkey.net/
// @version      12.1
// @description  Менеджер промтов с поддержкой переменных {{var}}, синхронизацией между Qwen и DeepSeek
// @author       You

// @run-at       document-end
// @downloadURL  https://github.com/supersvetodiod/prompt-manager/raw/refs/heads/main/corer.js
// @updateURL    https://github.com/supersvetodiod/prompt-manager/raw/refs/heads/main/corer.js
// @homepageURL  https://github.com/supersvetodiod/prompt-manager
// ==/UserScript==

// core.js - ваш основной код
(function() {
    'use strict';


// === ЛОКАЛИЗАЦИЯ ===
const I18N = {
    ru: {
        title: 'Менеджер Промтов',
        folders: 'ПАПКИ',
        allPrompts: 'Все промты',
        favorites: 'Избранное',
        search: 'Поиск...',
        newPrompt: '+ Новый промт',
        filter: 'Фильтр',
        filters: {
            dateDesc: '📅 По убыванию даты',
            dateAsc: '📅 По возрастанию даты',
            last7days: '🕐 За последние 7 дней',
            last14days: '🕐 За последние 14 дней',
            last30days: '🕐 За последние 30 дней'
        },
        noFolder: 'Все промты',
        createFolder: 'Новая папка',
        editFolder: 'Переименовать',
        deleteFolder: 'Удалить',
        subfolder: 'Подпапка',
        deleteAllFolders: 'Удалить все папки',
        export: 'Экспорт JSON',
        exportMarkdown: 'Экспорт в Markdown',
        import: 'Импорт JSON',
        movePrompt: 'Переместить промт',
        moveToFolder: 'Переместить',
        cancel: 'Отмена',
        close: 'Закрыть',
        copy: 'Копировать',
        preview: 'Предпросмотр',
        edit: 'Редактировать',
        move: 'Переместить',
        pin: 'Закрепить',
        unpin: 'Открепить',
        favorite: 'В избранное',
        unfavorite: 'Из избранного',
        delete: 'Удалить',
        drag: 'Перетащить',
        noPrompts: 'Нет промтов',
        createNew: 'Создайте новую папку и промт',
        notFound: 'Ничего не найдено',
        promptName: 'Название',
        promptText: 'Текст',
        folder: 'Папка',
        optional: 'необязательно',
        save: 'Сохранить',
        deleteWithContent: 'Удалить всё (с промтами)',
        deleteWithoutContent: 'Удалить папки (сохранить промты)',
        deleteConfirm: 'Вы уверены? Все папки и промты в них будут удалены безвозвратно!',
        movePromptsToRoot: 'Все промты будут перемещены в корень (без папки). Продолжить?',
        foldersDeleted: 'Все папки удалены',
        foldersDeletedPromptsSaved: 'Папки удалены, промты сохранены ✓',
        promptMoved: 'Промт перемещён ✓',
        copied: 'Скопировано!',
        error: 'Ошибка',
        exportSuccess: 'Экспорт выполнен ✓',
        importSuccess: 'Импортировано: ',
        importError: 'Ошибка импорта: ',
        renameFolder: 'Новое название папки:',
        folderRenamed: 'Название обновлено ✓',
        deletePromptConfirm: 'Удалить этот промт?',
        movePromptsConfirm: 'В папке и подпапках ',
        moveToParent: ' промт(ов). Переместить в родительскую папку?',
        deleteEmptyFolder: 'Удалить пустую папку?',
        language: 'Язык',
        dataSaved: 'Данные сохранены ✓',
        storageError: 'Ошибка сохранения! Проверьте режим браузера',
        gmStorage: 'Расширение',
        localStorage: 'Браузер',
        syncSuccess: 'Синхронизация хранилищ ✓',
        trash: 'Корзина',
        restore: 'Восстановить',
        deletePermanent: 'Удалить навсегда',
        emptyTrash: 'Очистить корзину',
        trashEmpty: 'Корзина пуста',
        trashCount: 'в корзине',
        restoreSuccess: 'Промт восстановлен ✓',
        deletePermanentConfirm: 'Удалить навсегда? Это действие необратимо!',
        emptyTrashConfirm: 'Очистить всю корзину? Все удалённые промты будут потеряны!',
        daysAgo: 'дн. назад',
        massDelete: 'Удалить выбранные',
        massMove: 'Переместить выбранные',
        massRestore: 'Восстановить',
        massDeletePermanent: 'Удалить навсегда',
        selectedCount: 'выбрано',
        confirmMassDelete: 'Удалить выбранные промты ({count})? Они будут перемещены в корзину.',
        confirmMassMove: 'Переместить выбранные промты ({count}) в выбранную папку?',
        confirmMassRestore: 'Восстановить выбранные промты ({count})?',
        confirmMassDeletePermanent: 'Удалить выбранные промты ({count}) навсегда? Это действие необратимо!',
        moveToFolder: 'Переместить в папку',
        confirmDeleteFavoriteFolder: 'Папка "Избранное" защищена от удаления. Вы можете удалить только промты внутри неё.',
        cannotDeleteFavorite: 'Папку "Избранное" нельзя удалить',
        favoriteFolderProtected: '⭐ Избранное (защищено)',
        subfolderInFavorites: 'Подпапка в Избранном',
        deleteSubfolderInFavorites: 'Удалить подпапку в Избранном? Все промты из неё будут перемещены в корневую папку "Избранное".',
        deleteSubfolderConfirm: 'В подпапке "{name}" находится {count} промт(ов). При удалении они будут перемещены в корневую папку "Избранное". Продолжить?',
        variables: 'Переменные',
        fillVariables: 'Заполните переменные',
        variable: 'Переменная',
        value: 'Значение',
        insert: 'Вставить',
        templateBadge: '📋 Шаблон',
        noVariables: 'Нет переменных в этом промпте',
        variableHint: 'Используйте {{variable}} или {variable} или [variable] в тексте промпта',
        tags: 'Теги',
        manageTags: 'Управление тегами',
        currentTags: 'Текущие теги',
        addTag: 'Добавить тег',
        newTag: 'Новый тег',
        clear: 'Очистить',
        chars: 'Символы',
        tokens: 'Токены',
        progress: 'Прогресс',
        tokenLimit: 'Лимит модели',
        versionApplied: '✅ Применена версия ${version}: "${name}"',
        versionDeleted: '🗑️ Версия удалена из истории',
        noSavedVersions: '📭 Нет сохранённых версий. История создаётся автоматически при каждом сохранении промпта.',
        versionHistoryHint: '💡 При каждом сохранении промпта автоматически создаётся новая версия. Хранится до 50 последних версий.',
        noTags: 'Нет тегов',
        noAvailableTags: 'Нет доступных тегов',
        backupCreated: '💾 Создан бэкап: ${reason}',
        backupNotFound: '❌ Бэкап не найден',
        backupCorrupted: '❌ Данные бэкапа повреждены',
        backupRestored: '✅ Восстановлен бэкап от ${date}',
        noBackups: '📭 Нет сохранённых бэкапов',
        backupManual: '📌 Ручное создание',
        backupBeforeImport: '📥 Авто-бэкап перед импортом',
        backupBeforeRestore: '🔄 Авто-бэкап перед восстановлением',
        backupDaily: '📅 Ежедневный авто-бэкап',
        backupRestoreBtn: '↩️ Восстановить',
        backupDeleteBtn: '🗑️ Удалить',
        backupTitle: '💾 Резервные копии (${current}/${max})',
        backupCreateNow: '📀 Создать бэкап сейчас',
        backupExportAll: '📤 Экспорт всех бэкапов',
        backupHint: '💡 Бэкапы создаются автоматически: перед импортом JSON, при ручном создании. Хранится до ${max} последних копий.',
        backupExported: '📦 Бэкапы экспортированы',
        backupDeleted: '🗑️ Бэкап удалён',
        createCopy: 'Создать копию',
        versionHistoryBadge: 'История версий: ${count} сохранённых версий',
        editorHotkeys: '⌨️ Ctrl+Enter 💾 | Shift+S 💾 | Esc ✖️',
modalHotkeys: '⌨️ Ctrl+Alt+N ➕ | Ctrl+Alt+P 📂 | Shift+F 🔍 | Esc ✖️',
        promptsMovedToTrash: '🗑️ ${count} промптов перемещено в корзину',
        promptsRestored: '↩️ ${count} промптов восстановлено',
        promptsMoved: '📁 ${count} промптов перемещено',
        undoDelete: '↩️ Удаление отменено ✓',
        undoMove: '↩️ Перемещение отменено ✓',
        undoRestore: '↩️ Восстановление отменено ✓',
        undoImpossible: '❌ Безвозвратное удаление нельзя отменить',
        undoNoActions: '❌ Нет действий для отмены',
        duplicatePrompt: '📑 Скопировано: "${name}"',
        currentVersion: '📌 ТЕКУЩАЯ ВЕРСИЯ',
        versionHistory: '📜 ИСТОРИЯ ВЕРСИЙ',
        versionNum: '📋 Версия ${num}',
        restoreThisVersion: '↩️ Применить эту версию',
        deleteThisVersion: '🗑️ Удалить',
        manageTagsFor: '🏷️ Управление тегами — ${name}',
        currentTagsLabel: '📌 Текущие теги',
        addTagLabel: '➕ Добавить тег',
        newTagPlaceholder: 'Новый тег',
        deleteBackupConfirm: 'Удалить этот бэкап?',
        restoreBackupConfirm: 'Восстановить данные из этого бэкапа? Текущие данные будут сохранены как отдельный бэкап.',
        noPromptsForExport: 'Нет промптов для экспорта',
        exportMarkdownSuccess: '📝 Экспорт в Markdown выполнен ✓',
        updateNotification: '🎉 Менеджер обновлён до версии ${version}',
viewChanges: '📋 Посмотреть изменения'
    },
    en: {
        title: 'Prompt Manager',
        folders: 'FOLDERS',
        allPrompts: 'All Prompts',
        favorites: 'Favorites',
        search: 'Search...',
        newPrompt: '+ New Prompt',
        filter: 'Filter',
        filters: {
            dateDesc: '📅 By Date (Newest)',
            dateAsc: '📅 By Date (Oldest)',
            last7days: '🕐 Last 7 Days',
            last14days: '🕐 Last 14 Days',
            last30days: '🕐 Last 30 Days'
        },
        noFolder: 'All Prompts',
        createFolder: 'New Folder',
        editFolder: 'Rename',
        deleteFolder: 'Delete',
        subfolder: 'Subfolder',
        deleteAllFolders: 'Delete All Folders',
        export: 'Export JSON',
        exportMarkdown: 'Export to Markdown',
        import: 'Import JSON',
        movePrompt: 'Move Prompt',
        moveToFolder: 'Move',
        cancel: 'Cancel',
        close: 'Close',
        copy: 'Copy',
        preview: 'Preview',
        edit: 'Edit',
        move: 'Move',
        pin: 'Pin',
        unpin: 'Unpin',
        favorite: 'Add to favorites',
        unfavorite: 'Remove from favorites',
        delete: 'Delete',
        drag: 'Drag',
        noPrompts: 'No prompts',
        createNew: 'Create a new folder and prompt',
        notFound: 'Nothing found',
        promptName: 'Name',
        promptText: 'Text',
        folder: 'Folder',
        optional: 'optional',
        save: 'Save',
        deleteWithContent: 'Delete All (with prompts)',
        deleteWithoutContent: 'Delete Folders (keep prompts)',
        deleteConfirm: 'Are you sure? All folders and prompts will be permanently deleted!',
        movePromptsToRoot: 'All prompts will be moved to root (no folder). Continue?',
        foldersDeleted: 'All folders deleted',
        foldersDeletedPromptsSaved: 'Folders deleted, prompts saved ✓',
        promptMoved: 'Prompt moved ✓',
        copied: 'Copied!',
        error: 'Error',
        exportSuccess: 'Export completed ✓',
        importSuccess: 'Imported: ',
        importError: 'Import error: ',
        renameFolder: 'New folder name:',
        folderRenamed: 'Name updated ✓',
        deletePromptConfirm: 'Delete this prompt?',
        movePromptsConfirm: 'Folder contains ',
        moveToParent: ' prompt(s). Move to parent folder?',
        deleteEmptyFolder: 'Delete empty folder?',
        language: 'Language',
        dataSaved: 'Data saved ✓',
        storageError: 'Storage error! Check browser mode',
        gmStorage: 'Extension',
        localStorage: 'Browser',
        syncSuccess: 'Storage sync ✓',
        trash: 'Trash',
        restore: 'Restore',
        deletePermanent: 'Delete Permanently',
        emptyTrash: 'Empty Trash',
        trashEmpty: 'Trash is empty',
        trashCount: 'in trash',
        restoreSuccess: 'Prompt restored ✓',
        deletePermanentConfirm: 'Delete permanently? This action is irreversible!',
        emptyTrashConfirm: 'Empty entire trash? All deleted prompts will be lost!',
        daysAgo: 'days ago',
        massDelete: 'Delete Selected',
        massMove: 'Move Selected',
        massRestore: 'Restore',
        massDeletePermanent: 'Delete Permanently',
        selectedCount: 'selected',
        confirmMassDelete: 'Delete selected prompts ({count})? They will be moved to trash.',
        confirmMassMove: 'Move selected prompts ({count}) to selected folder?',
        confirmMassRestore: 'Restore selected prompts ({count})?',
        confirmMassDeletePermanent: 'Permanently delete selected prompts ({count})? This action is irreversible!',
        moveToFolder: 'Move to folder',
        confirmDeleteFavoriteFolder: 'The "Favorites" folder is protected from deletion. You can only delete prompts inside it.',
        cannotDeleteFavorite: 'Cannot delete Favorites folder',
        favoriteFolderProtected: '⭐ Favorites (protected)',
        subfolderInFavorites: 'Subfolder in Favorites',
        deleteSubfolderInFavorites: 'Delete subfolder in Favorites? All prompts will be moved to the root Favorites folder.',
        deleteSubfolderConfirm: 'Subfolder "{name}" contains {count} prompt(s). They will be moved to the root Favorites folder. Continue?',
        variables: 'Variables',
        fillVariables: 'Fill variables',
        variable: 'Variable',
        value: 'Value',
        insert: 'Insert',
        templateBadge: '📋 Template',
        noVariables: 'No variables in this prompt',
        variableHint: 'Use {{variable}} or {variable} or [variable] in prompt text',
        tags: 'Tags',
        manageTags: 'Manage Tags',
        currentTags: 'Current Tags',
        addTag: 'Add Tag',
        newTag: 'New tag',
        clear: 'Clear',
        chars: 'Characters',
        tokens: 'Tokens',
        progress: 'Progress',
        tokenLimit: 'Model limit',
        versionApplied: '✅ Applied version ${version}: "${name}"',
        versionDeleted: '🗑️ Version deleted from history',
        noSavedVersions: '📭 No saved versions. History is created automatically every time a prompt is saved.',
        versionHistoryHint: '💡 A new version is automatically created every time a prompt is saved. Up to 50 latest versions are stored.',
        noTags: 'No tags',
        noAvailableTags: 'No available tags',
        backupCreated: '💾 Backup created: ${reason}',
        backupNotFound: '❌ Backup not found',
        backupCorrupted: '❌ Backup data corrupted',
        backupRestored: '✅ Restored backup from ${date}',
        noBackups: '📭 No saved backups',
        backupManual: '📌 Manual creation',
        backupBeforeImport: '📥 Auto-backup before import',
        backupBeforeRestore: '🔄 Auto-backup before restore',
        backupDaily: '📅 Daily auto-backup',
        backupRestoreBtn: '↩️ Restore',
        backupDeleteBtn: '🗑️ Delete',
        backupTitle: '💾 Backups (${current}/${max})',
        backupCreateNow: '📀 Create backup now',
        backupExportAll: '📤 Export all backups',
        backupHint: '💡 Backups are created automatically: before JSON import, when manually created. Stores up to ${max} latest copies.',
        backupExported: '📦 Backups exported',
        backupDeleted: '🗑️ Backup deleted',
        createCopy: 'Create copy',
        versionHistoryBadge: 'Version history: ${count} saved versions',
        editorHotkeys: '⌨️ Ctrl+Enter 💾 | Shift+S 💾 | Esc ✖️',
modalHotkeys: '⌨️ Ctrl+Alt+N ➕ | Ctrl+Alt+P 📂 | Shift+F 🔍 | Esc ✖️',
        promptsMovedToTrash: '🗑️ ${count} prompts moved to trash',
        promptsRestored: '↩️ ${count} prompts restored',
        promptsMoved: '📁 ${count} prompts moved',
        undoDelete: '↩️ Deletion undone ✓',
        undoMove: '↩️ Move undone ✓',
        undoRestore: '↩️ Restoration undone ✓',
        undoImpossible: '❌ Permanent deletion cannot be undone',
        undoNoActions: '❌ No actions to undo',
        duplicatePrompt: '📑 Copied: "${name}"',
        currentVersion: '📌 CURRENT VERSION',
        versionHistory: '📜 VERSION HISTORY',
        versionNum: '📋 Version ${num}',
        restoreThisVersion: '↩️ Restore this version',
        deleteThisVersion: '🗑️ Delete',
        manageTagsFor: '🏷️ Manage Tags — ${name}',
        currentTagsLabel: '📌 Current Tags',
        addTagLabel: '➕ Add Tag',
        newTagPlaceholder: 'New tag',
        deleteBackupConfirm: 'Delete this backup?',
        restoreBackupConfirm: 'Restore data from this backup? Current data will be saved as a separate backup.',
        noPromptsForExport: 'No prompts to export',
        exportMarkdownSuccess: '📝 Export to Markdown completed ✓',
    updateNotification: '🎉 Manager updated to version ${version}',
viewChanges: '📋 View changes'
    },
    fr: {
        title: 'Gestionnaire de Prompts',
        folders: 'DOSSIERS',
        allPrompts: 'Tous les Prompts',
        favorites: 'Favoris',
        search: 'Rechercher...',
        newPrompt: '+ Nouveau Prompt',
        filter: 'Filtre',
        filters: {
            dateDesc: '📅 Par Date (Récent)',
            dateAsc: '📅 Par Date (Ancien)',
            last7days: '🕐 7 Derniers Jours',
            last14days: '🕐 14 Derniers Jours',
            last30days: '🕐 30 Derniers Jours'
        },
        noFolder: 'Tous les Prompts',
        createFolder: 'Nouveau Dossier',
        editFolder: 'Renommer',
        deleteFolder: 'Supprimer',
        subfolder: 'Sous-dossier',
        deleteAllFolders: 'Supprimer Tous',
        export: 'Exporter JSON',
        exportMarkdown: 'Exporter en Markdown',
        import: 'Importer JSON',
        movePrompt: 'Déplacer Prompt',
        moveToFolder: 'Déplacer',
        cancel: 'Annuler',
        close: 'Fermer',
        copy: 'Copier',
        preview: 'Aperçu',
        edit: 'Modifier',
        move: 'Déplacer',
        pin: 'Épingler',
        unpin: 'Désépingler',
        favorite: 'Ajouter aux favoris',
        unfavorite: 'Retirer des favoris',
        delete: 'Supprimer',
        drag: 'Glisser',
        noPrompts: 'Aucun prompt',
        createNew: 'Créez un dossier et un prompt',
        notFound: 'Rien trouvé',
        promptName: 'Nom',
        promptText: 'Texte',
        folder: 'Dossier',
        optional: 'optionnel',
        save: 'Enregistrer',
        deleteWithContent: 'Tout Supprimer (avec prompts)',
        deleteWithoutContent: 'Supprimer Dossiers (garder prompts)',
        deleteConfirm: 'Êtes-vous sûr? Tous les dossiers et prompts seront supprimés!',
        movePromptsToRoot: 'Tous les prompts seront déplacés à la racine. Continuer?',
        foldersDeleted: 'Tous les dossiers supprimés',
        foldersDeletedPromptsSaved: 'Dossiers supprimés, prompts sauvegardés ✓',
        promptMoved: 'Prompt déplacé ✓',
        copied: 'Copié!',
        error: 'Erreur',
        exportSuccess: 'Export terminé ✓',
        importSuccess: 'Importé: ',
        importError: 'Erreur d\'import: ',
        renameFolder: 'Nouveau nom du dossier:',
        folderRenamed: 'Nom mis à jour ✓',
        deletePromptConfirm: 'Supprimer ce prompt?',
        movePromptsConfirm: 'Le dossier contient ',
        moveToParent: ' prompt(s). Déplacer au dossier parent?',
        deleteEmptyFolder: 'Supprimer le dossier vide?',
        language: 'Langue',
        dataSaved: 'Données sauvegardées ✓',
        storageError: 'Erreur de stockage! Vérifiez le mode navigateur',
        gmStorage: 'Extension',
        localStorage: 'Navigateur',
        syncSuccess: 'Synchronisation ✓',
        trash: 'Corbeille',
        restore: 'Restaurer',
        deletePermanent: 'Supprimer Définitivement',
        emptyTrash: 'Vider la Corbeille',
        trashEmpty: 'Corbeille vide',
        trashCount: 'dans la corbeille',
        restoreSuccess: 'Prompt restauré ✓',
        deletePermanentConfirm: 'Supprimer définitivement? Cette action est irréversible!',
        emptyTrashConfirm: 'Vider toute la corbeille? Tous les prompts supprimés seront perdus!',
        daysAgo: 'jours',
        massDelete: 'Supprimer sélection',
        massMove: 'Déplacer sélection',
        massRestore: 'Restaurer',
        massDeletePermanent: 'Supprimer définitivement',
        selectedCount: 'sélectionnés',
        confirmMassDelete: 'Supprimer les prompts sélectionnés ({count})? Ils seront déplacés à la corbeille.',
        confirmMassMove: 'Déplacer les prompts sélectionnés ({count}) vers le dossier choisi?',
        confirmMassRestore: 'Restaurer les prompts sélectionnés ({count})?',
        confirmMassDeletePermanent: 'Supprimer définitivement les prompts sélectionnés ({count})? Action irréversible!',
        moveToFolder: 'Déplacer vers le dossier',
        confirmDeleteFavoriteFolder: 'Le dossier "Favoris" est protégé contre la suppression. Vous ne pouvez supprimer que les prompts à l\'intérieur.',
        cannotDeleteFavorite: 'Impossible de supprimer le dossier Favoris',
        favoriteFolderProtected: '⭐ Favoris (protégé)',
        subfolderInFavorites: 'Sous-dossier dans Favoris',
        deleteSubfolderInFavorites: 'Supprimer le sous-dossier dans Favoris ? Tous les prompts seront déplacés vers le dossier Favoris racine.',
        deleteSubfolderConfirm: 'Le sous-dossier "{name}" contient {count} prompt(s). Ils seront déplacés vers le dossier Favoris racine. Continuer ?',
        variables: 'Variables',
        fillVariables: 'Remplir les variables',
        variable: 'Variable',
        value: 'Valeur',
        insert: 'Insérer',
        templateBadge: '📋 Modèle',
        noVariables: 'Aucune variable dans ce prompt',
        variableHint: 'Utilisez {{variable}} ou {variable} ou [variable] dans le texte',
        tags: 'Étiquettes',
        manageTags: 'Gérer les étiquettes',
        currentTags: 'Étiquettes actuelles',
        addTag: 'Ajouter une étiquette',
        newTag: 'Nouvelle étiquette',
        clear: 'Effacer',
        chars: 'Caractères',
        tokens: 'Jetons',
        progress: 'Progression',
        tokenLimit: 'Limite du modèle',
        versionApplied: '✅ Version ${version} appliquée : "${name}"',
        versionDeleted: '🗑️ Version supprimée de l\'historique',
        noSavedVersions: '📭 Aucune version sauvegardée. L\'historique est créé automatiquement à chaque sauvegarde.',
        versionHistoryHint: '💡 Une nouvelle version est automatiquement créée à chaque sauvegarde. Jusqu\'à 50 versions sont stockées.',
        noTags: 'Aucun tag',
        noAvailableTags: 'Aucun tag disponible',
        backupCreated: '💾 Sauvegarde créée : ${reason}',
        backupNotFound: '❌ Sauvegarde introuvable',
        backupCorrupted: '❌ Données de sauvegarde corrompues',
        backupRestored: '✅ Sauvegarde restaurée du ${date}',
        noBackups: '📭 Aucune sauvegarde',
        backupManual: '📌 Création manuelle',
        backupBeforeImport: '📥 Auto-sauvegarde avant import',
        backupBeforeRestore: '🔄 Auto-sauvegarde avant restauration',
        backupDaily: '📅 Auto-sauvegarde quotidienne',
        backupRestoreBtn: '↩️ Restaurer',
        backupDeleteBtn: '🗑️ Supprimer',
        backupTitle: '💾 Sauvegardes (${current}/${max})',
        backupCreateNow: '📀 Créer une sauvegarde',
        backupExportAll: '📤 Exporter toutes les sauvegardes',
        backupHint: '💡 Les sauvegardes sont créées automatiquement : avant l\'import JSON, lors de la création manuelle. Conserve jusqu\'à ${max} copies.',
        backupExported: '📦 Sauvegardes exportées',
        backupDeleted: '🗑️ Sauvegarde supprimée',
        createCopy: 'Créer une copie',
        versionHistoryBadge: 'Historique : ${count} versions',
        editorHotkeys: '⌨️ Ctrl+Enter 💾 | Shift+S 💾 | Esc ✖️',
modalHotkeys: '⌨️ Ctrl+Alt+N ➕ | Ctrl+Alt+P 📂 | Shift+F 🔍 | Esc ✖️',
        promptsMovedToTrash: '🗑️ ${count} prompts déplacés vers la corbeille',
        promptsRestored: '↩️ ${count} prompts restaurés',
        promptsMoved: '📁 ${count} prompts déplacés',
        undoDelete: '↩️ Suppression annulée ✓',
        undoMove: '↩️ Déplacement annulé ✓',
        undoRestore: '↩️ Restauration annulée ✓',
        undoImpossible: '❌ La suppression définitive ne peut pas être annulée',
        undoNoActions: '❌ Aucune action à annuler',
        duplicatePrompt: '📑 Copié : "${name}"',
        currentVersion: '📌 VERSION ACTUELLE',
        versionHistory: '📜 HISTORIQUE DES VERSIONS',
        versionNum: '📋 Version ${num}',
        restoreThisVersion: '↩️ Appliquer cette version',
        deleteThisVersion: '🗑️ Supprimer',
        manageTagsFor: '🏷️ Gérer les tags — ${name}',
        currentTagsLabel: '📌 Tags actuels',
        addTagLabel: '➕ Ajouter un tag',
        newTagPlaceholder: 'Nouveau tag',
        deleteBackupConfirm: 'Supprimer cette sauvegarde ?',
        restoreBackupConfirm: 'Restaurer les données depuis cette sauvegarde ? Les données actuelles seront sauvegardées séparément.',
        noPromptsForExport: 'Aucun prompt à exporter',
        exportMarkdownSuccess: '📝 Export Markdown terminé ✓',
        updateNotification: '🎉 Gestionnaire mis à jour vers la version ${version}',
viewChanges: '📋 Voir les modifications'
    }
};

let currentLang = localStorage.getItem('qpm_language') || 'ru';
const t = (key) => {
    const keys = key.split('.');
    let value = I18N[currentLang];
    for (const k of keys) {
        value = value[k];
        if (!value) return key;
    }
    return value;
};

const SITE_CONFIG = {
    'chat.qwen.ai': {
        name: 'qwen',
        buttonContainer: '.message-input-container .message-input-right-button',
        insertBefore: '.message-input-container .message-input-right-button .qwen-thinking-selector',
        textarea: 'textarea.message-input-textarea, textarea',
        buttonLabel: '📋 Промты'
    },
    'chat.deepseek.com': {
        name: 'deepseek',
        buttonContainer: '.bf38813a, [class*="input-container"], .chat-input-footer, .input-area',
        insertBefore: '[class*="send-button"], [class*="submit"], input[type="file"]',
        textarea: 'textarea[placeholder*="essage"], textarea[role="textbox"], textarea',
        buttonLabel: '📋 Prompts'
    },
        'alice.yandex.ru': {
    name: 'alice',
    buttonContainer: '.AliceInput-Container, .message-input-container, [class*="input-container"]',
    insertBefore: 'button[data-testid="oknyx"], button.StandaloneOknyx, button[aria-label*="Алиса"]',
    textarea: 'textarea.AliceInput-Textarea, textarea[class*="AliceInput"], textarea[data-testid="inputbase-textarea"]',
    buttonLabel: '📋 Промты'
    },
                'giga.chat': {
        name: 'giga',
        buttonContainer: '.chat-input-area, .input-area, [class*="input-container"], .chat-footer',
        insertBefore: 'button[data-da_name="CallButton"]',
        textarea: 'textarea#chat-input-textarea, textarea',
        buttonLabel: '📋 Промты'
    }
};

const currentHost = window.location.hostname;
const config = SITE_CONFIG[currentHost] || SITE_CONFIG['chat.qwen.ai'];

const STORAGE_KEY = 'qpm_universal_prompts_data_v1';
const STORAGE_KEY_EXPANDED = STORAGE_KEY + '_expanded';
const TRASH_CLEANUP_DAYS = 30;
const TRASH_CLEANUP_MS = TRASH_CLEANUP_DAYS * 24 * 60 * 60 * 1000;
const FAVORITES_FOLDER_ID = 'favorites_root';
const SCRIPT_VERSION = (typeof GM_info !== 'undefined' && GM_info.script && GM_info.script.version) ? GM_info.script.version : '12.5';

    
let data = { folders: [], prompts: [] };
let currentFolderId = 'all';
let modalOpen = false;
let modalEl = null;
let currentSearchQuery = '';
let currentFilter = 'dateDesc';
let draggedPromptId = null;
let expandedFolders = {};
let storageSource = 'unknown';
let selectedPrompts = new Set();
let lastSelectedPromptId = null;
let isSyncing = false;

// === ФУНКЦИИ ДЛЯ РАБОТЫ С ПЕРЕМЕННЫМИ ===
function extractVariables(text) {
    if (!text) return [];
    const variables = new Set();
    const regex = /\{\{([^}]+)\}\}|\{([^}]+)\}|\[([^\]]+)\]/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const varName = (match[1] || match[2] || match[3]).trim();
        if (varName) variables.add(varName);
    }
    return Array.from(variables);
}

function hasVariables(text) {
    return extractVariables(text).length > 0;
}

function replaceVariables(text, values) {
    if (!text) return text;
    let result = text;
    for (const [key, value] of Object.entries(values)) {
        result = result.replace(new RegExp(`\\{\\{${escapeRegex(key)}\\}\\}`, 'g'), value);
        result = result.replace(new RegExp(`\\{${escapeRegex(key)}\\}`, 'g'), value);
        result = result.replace(new RegExp(`\\[${escapeRegex(key)}\\]`, 'g'), value);
    }
    return result;
}

function openVariableDialog(prompt, onComplete) {
    const variables = extractVariables(prompt.text);
    if (variables.length === 0) {
        onComplete(prompt.text);
        return;
    }
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay';
    overlay.id = 'qpm-variable-overlay';
    let inputsHtml = '';
    variables.forEach((varName, index) => {
        inputsHtml += `
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #ffd700; font-size: 13px; font-weight: 500;">
                    ${escapeHtml(varName)}:
                </label>
                <input type="text"
                       id="qpm-var-${index}"
                       data-var="${escapeHtml(varName)}"
                       class="qpm-variable-input"
                       style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #444; color: white; border-radius: 6px; font-size: 14px;"
                       placeholder="${escapeHtml(varName)}..."
                       autocomplete="off">
            </div>
        `;
    });

    // Получаем теги промпта
    const promptTags = prompt.tags || [];

    const savedValues = JSON.parse(localStorage.getItem('qpm_variable_values') || '{}');
    overlay.innerHTML = `
        <div class="qpm-preview" style="width: 500px; max-height: 80vh;">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">
                    📝 ${t('fillVariables')}
                    ${hasVariables(prompt.text) ? '<span style="font-size: 11px; background: #10a37f; padding: 2px 8px; border-radius: 12px; margin-left: 10px;">📋 Template</span>' : ''}
                </div>
                <div class="qpm-preview-close" id="qpm-variable-close">&times;</div>
            </div>
            <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
                <div style="margin-bottom: 15px; padding: 8px 12px; background: #2a2b2e; border-radius: 6px; font-size: 12px; color: #888;">
                    💡 ${t('variableHint')}
                </div>

                <!-- СЕКЦИЯ ТЕГОВ -->
                <div style="margin-bottom: 20px; padding: 10px; background: #1a1a1a; border-radius: 8px; border: 1px solid #444;">
                    <div style="font-size: 13px; color: #ffd700; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                        🏷️ ${t('tags')}
                        <span style="font-size: 11px; color: #888; font-weight: normal;">(можно добавить/изменить перед вставкой)</span>
                    </div>
                    <div id="qpm-variable-tags-container" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;">
                        ${promptTags.length === 0 ? '<span style="color:#666; font-size:12px;">' + t('noTags') + '</span>' :
                            promptTags.map(tag => `<span class="qpm-tag qpm-tag-removable" data-tag="${escapeHtml(tag)}" style="background: rgba(16,163,127,0.2); cursor: pointer;">#${escapeHtml(tag)} <span style="margin-left:4px; color:#ff8888;">✖️</span></span>`).join('')}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <input type="text" id="qpm-variable-new-tag" placeholder="${t('addTag')}..." style="flex: 1; padding: 6px; background: #2a2b2e; border: 1px solid #555; color: white; border-radius: 4px; font-size: 12px;">
                        <button id="qpm-variable-add-tag" style="background: #10a37f; border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">➕ ${t('addTag')}</button>
                    </div>
                    <div style="font-size: 10px; color: #666; margin-top: 6px;">
                        💡 Теги будут сохранены в промпте после вставки
                    </div>
                </div>

                <div id="qpm-variables-container">
                    ${inputsHtml}
                </div>
                <div style="margin-top: 15px; padding: 10px; background: #1a1a1a; border-radius: 6px;">
                    <div style="font-size: 12px; color: #888; margin-bottom: 5px;">📄 ${t('preview')}:</div>
                    <div id="qpm-preview-text" style="font-size: 13px; color: #aaa; line-height: 1.5; max-height: 150px; overflow-y: auto; white-space: pre-wrap; font-family: monospace;"></div>
                </div>
            </div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-variable-cancel">${t('cancel')}</button>
                <button class="qpm-preview-btn qpm-preview-btn-copy" id="qpm-variable-insert" style="background: linear-gradient(145deg, #10a37f, #0e8c6d);">📋 ${t('insert')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Сохраняем текущие теги для возможного обновления
    let currentTags = [...promptTags];

    // Функция обновления отображения тегов
    function updateTagsDisplay() {
        const container = overlay.querySelector('#qpm-variable-tags-container');
        if (currentTags.length === 0) {
            container.innerHTML = '<span style="color:#666; font-size:12px;">' + t('noTags') + '</span>';
        } else {
            container.innerHTML = currentTags.map(tag =>
                `<span class="qpm-tag qpm-tag-removable" data-tag="${escapeHtml(tag)}" style="background: rgba(16,163,127,0.2); cursor: pointer;">#${escapeHtml(tag)} <span style="margin-left:4px; color:#ff8888;">✖️</span></span>`
            ).join('');
            // Добавляем обработчики для удаления тегов
            container.querySelectorAll('.qpm-tag-removable').forEach(el => {
                el.addEventListener('click', () => {
                    const tag = el.dataset.tag;
                    const index = currentTags.indexOf(tag);
                    if (index !== -1) {
                        currentTags.splice(index, 1);
                        updateTagsDisplay();
                    }
                });
            });
        }
    }

    // Добавляем обработчик для добавления тега
    overlay.querySelector('#qpm-variable-add-tag').addEventListener('click', () => {
        const newTagInput = overlay.querySelector('#qpm-variable-new-tag');
        const newTag = newTagInput.value.trim();
        if (newTag && !currentTags.includes(newTag)) {
            // Проверка на валидность тега (буквы, цифры, подчеркивания, дефисы, кириллица)
            if (/^[\w\u0400-\u04FF\-]+$/.test(newTag)) {
                currentTags.push(newTag);
                updateTagsDisplay();
                newTagInput.value = '';
            } else {
                showToast('Тег может содержать только буквы, цифры, дефис и подчеркивание', true);
            }
        } else if (newTag && currentTags.includes(newTag)) {
            showToast('Такой тег уже есть', true);
        }
    });

    // Добавляем Enter для поля ввода тега
    overlay.querySelector('#qpm-variable-new-tag').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            overlay.querySelector('#qpm-variable-add-tag').click();
        }
    });

    updateTagsDisplay();

    const inputs = overlay.querySelectorAll('.qpm-variable-input');
    inputs.forEach((input, index) => {
        const varName = variables[index];
        if (savedValues[varName]) {
            input.value = savedValues[varName];
        }
        input.addEventListener('input', () => updatePreview());
    });

    function updatePreview() {
        const values = {};
        inputs.forEach((input, index) => {
            const varName = variables[index];
            values[varName] = input.value || `[${varName}]`;
        });
        const previewText = replaceVariables(prompt.text, values);
        const previewDiv = overlay.querySelector('#qpm-preview-text');
        if (previewDiv) {
            previewDiv.innerHTML = escapeHtml(previewText).replace(/\n/g, '<br>');
        }
    }
    setTimeout(updatePreview, 10);

    const close = () => overlay.remove();
    overlay.querySelector('#qpm-variable-close').addEventListener('click', close);
    overlay.querySelector('#qpm-variable-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    overlay.querySelector('#qpm-variable-insert').addEventListener('click', () => {
        const values = {};
        inputs.forEach((input, index) => {
            const varName = variables[index];
            const value = input.value.trim();
            if (value) {
                values[varName] = value;
                savedValues[varName] = value;
            } else {
                values[varName] = `[${varName}]`;
            }
        });

        // Обновляем теги промпта, если они изменились
        if (JSON.stringify(currentTags) !== JSON.stringify(prompt.tags || [])) {
            if (currentTags.length > 0) {
                prompt.tags = currentTags;
            } else {
                delete prompt.tags;
            }
            saveData(); // Сохраняем изменения тегов
        }

        localStorage.setItem('qpm_variable_values', JSON.stringify(savedValues));
        const finalText = replaceVariables(prompt.text, values);
        onComplete(finalText);
        close();
    });

    overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
        if (e.key === 'Enter' && e.ctrlKey) {
            overlay.querySelector('#qpm-variable-insert').click();
        }
    });
    overlay.style.display = 'flex';
    setTimeout(() => {
        const firstInput = overlay.querySelector('.qpm-variable-input');
        if (firstInput) firstInput.focus();
    }, 100);
}

function insertPromptWithVariables(prompt) {
    if (hasVariables(prompt.text)) {
        openVariableDialog(prompt, (finalText) => {
            insertTextToChat(finalText);
            if (modalOpen) toggleModal();
        });
    } else {
        const ok = insertTextToChat(prompt.text);
        if (ok && modalOpen) toggleModal();
        if (!ok) showToast(t('error'), true);
    }
}

// === СТИЛИ ===
const templateStyles = `
    .qpm-template-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: linear-gradient(145deg, #8e44ad, #6c3483);
        color: white;
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 12px;
        margin-left: 8px;
        cursor: help;
    }
    .qpm-variable-input {
        transition: all 0.2s;
    }
    .qpm-variable-input:focus {
        outline: none;
        border-color: #10a37f !important;
        box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.2);
    }
`;

if (!document.getElementById('qpm-template-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'qpm-template-styles';
    styleSheet.innerText = templateStyles;
    document.head.appendChild(styleSheet);
}

const styles = `
    .qpm-btn {
        background-color: #4a4a4a; color: white; border: 1px solid #555;
        padding: 0 12px; border-radius: 6px; cursor: pointer; font-size: 13px;
        font-weight: 500; margin: 0 4px; transition: all 0.2s;
        display: inline-flex; align-items: center; justify-content: center;
        height: 32px; white-space: nowrap; min-width: 70px;
    }
    .qpm-btn:hover { background-color: #666; border-color: #777; }
    .qpm-btn:active { background-color: #333; }
    .qpm-modal-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); z-index: 99999;
        display: none; justify-content: center; align-items: center;
        backdrop-filter: blur(3px);
    }
    .qpm-modal {
        background: #202123; color: #ececf1;
        width: 950px; max-width: 95%; height: 650px; max-height: 90vh;
        border-radius: 10px; display: flex; flex-direction: column;
        border: 1px solid #444; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    }
    .qpm-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 15px 20px; border-bottom: 1px solid #444;
        background: #2a2b2e; border-radius: 10px 10px 0 0;
    }
    .qpm-title { font-size: 18px; font-weight: bold; display: flex; align-items: center; gap: 10px; }
    .qpm-header-right { display: flex; align-items: center; gap: 10px; }
    .qpm-close { cursor: pointer; font-size: 24px; color: #aaa; line-height: 1; padding: 5px; border-radius: 4px; }
    .qpm-close:hover { color: white; background: #444; }
    .qpm-body { display: flex; flex: 1; overflow: hidden; }
    .qpm-sidebar {
        width: auto; min-width: 250px; max-width: 400px;
        border-right: 1px solid #444; display: flex; flex-direction: column;
        background: #252629; resize: horizontal; overflow: auto;
    }
    .qpm-sidebar-header { padding: 15px; border-bottom: 1px solid #444; display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
    .qpm-sidebar-title { font-size: 14px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
    .qpm-sidebar-buttons { display: flex; gap: 4px; flex-wrap: wrap; }
    .qpm-add-folder-btn {
        background: linear-gradient(145deg, #10a37f, #0e8c6d); border: none; color: white;
        width: 32px; height: 32px; border-radius: 6px; cursor: pointer;
        font-size: 20px; display: flex; align-items: center; justify-content: center;
        transition: all 0.2s; box-shadow: 0 2px 8px rgba(16, 163, 127, 0.3);
    }
    .qpm-add-folder-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(16, 163, 127, 0.5);
    }
    .qpm-folder-list { flex: 1; overflow-y: auto; padding: 10px; }
    .qpm-folder-list::-webkit-scrollbar { width: 6px; }
    .qpm-folder-list::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }
    .qpm-folder-list::-webkit-scrollbar-track { background: transparent; }
    .qpm-folder-tree { list-style: none; padding: 0; margin: 0; }
    .qpm-folder-tree ul {
        list-style: none;
        padding-left: 20px;
        margin: 0;
        border-left: 1px dashed #444;
        margin-left: 10px;
    }
    .qpm-folder-tree li { margin: 2px 0; }
    .qpm-folder-item {
        padding: 8px 12px; border-radius: 6px; cursor: pointer;
        display: flex; justify-content: space-between; align-items: center;
        transition: all 0.2s; font-size: 14px;
        margin-bottom: 2px;
    }
    .qpm-folder-item:hover { background: #3a3d42; }
    .qpm-folder-item.active { background: #10a37f; color: white; }
    .qpm-folder-item.active:hover { background: #0e8c6d; }
    .qpm-folder-item.protected {
        background: rgba(255, 215, 0, 0.15);
        border-left: 2px solid #ffd700;
    }
    .qpm-folder-item.protected.active {
        background: #10a37f;
        border-left: 2px solid #ffd700;
    }
    .qpm-folder-item.subfolder-in-favorites {
        background: rgba(255, 215, 0, 0.08);
        border-left: 2px solid rgba(255, 215, 0, 0.5);
    }
    .qpm-folder-item.subfolder-in-favorites.active {
        background: #10a37f;
        border-left: 2px solid #ffd700;
    }
    .qpm-folder-content { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
    .qpm-folder-toggle {
        width: 16px; height: 16px;
        display: inline-flex; align-items: center; justify-content: center;
        cursor: pointer; font-size: 10px; color: #888; flex-shrink: 0;
        transition: transform 0.2s;
    }
    .qpm-folder-toggle.expanded { transform: rotate(90deg); }
    .qpm-folder-toggle.hidden { visibility: hidden; }
    .qpm-folder-icon { font-size: 16px; flex-shrink: 0; }
    .qpm-folder-name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
    }
    .qpm-folder-count {
        font-size: 11px; background: rgba(255,255,255,0.15);
        padding: 2px 6px; border-radius: 10px; min-width: 20px; text-align: center;
        flex-shrink: 0;
    }
    .qpm-folder-actions { display: none; gap: 3px; flex-shrink: 0; }
    .qpm-folder-item:hover .qpm-folder-actions { display: flex; }
    .qpm-folder-actions button {
        background: transparent; border: none; color: #aaa;
        cursor: pointer; padding: 2px 4px; font-size: 11px; border-radius: 3px;
    }
    .qpm-folder-actions button:hover { background: rgba(255,255,255,0.1); color: white; }
    .qpm-folder-actions button.delete:hover { background: rgba(255,68,68,0.2); color: #ff4444; }
    .qpm-folder-actions button.subfolder:hover { background: rgba(16, 163, 127, 0.2); color: #10a37f; }
    .qpm-folder-actions button.edit:hover { background: rgba(255, 165, 0, 0.2); color: #ffa500; }
    .qpm-folder-actions button.delete.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }
    .qpm-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .qpm-search-area { padding: 15px; border-bottom: 1px solid #444; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .qpm-search-input {
        flex: 1; background: #1a1a1a; border: 1px solid #444; color: white;
        padding: 10px 15px; border-radius: 6px; font-size: 14px;
        min-width: 150px;
    }
    .qpm-search-input:focus { outline: none; border-color: #10a37f; }
    .qpm-controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .qpm-filter-btn {
        background: #1a1a1a; border: 1px solid #444; color: #aaa;
        padding: 10px 12px; border-radius: 6px; cursor: pointer;
        font-size: 16px; display: flex; align-items: center; justify-content: center;
        transition: all 0.2s; position: relative;
    }
    .qpm-filter-btn:hover {
        background: #2a2a2a; border-color: #666; color: white;
        transform: scale(1.05);
    }
    .qpm-filter-dropdown {
        position: absolute; top: 100%; right: 0; margin-top: 5px;
        background: #2a2b2e; border: 1px solid #444; border-radius: 6px;
        min-width: 220px; z-index: 1000; display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
    .qpm-filter-dropdown.show { display: block; }
    .qpm-filter-dropdown-item {
        padding: 10px 15px; cursor: pointer; font-size: 13px;
        display: flex; align-items: center; gap: 8px;
        transition: background 0.2s;
    }
    .qpm-filter-dropdown-item:hover { background: #3a3d42; }
    .qpm-filter-dropdown-item.active { background: #10a37f; color: white; }
    .qpm-add-prompt-btn {
        background: linear-gradient(145deg, #10a37f, #0e8c6d); color: white; border: none;
        padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px; white-space: nowrap;
    }
    .qpm-add-prompt-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(16, 163, 127, 0.4); }
    .qpm-mass-actions-bar {
        background: #2a2b2e; padding: 8px 15px; border-bottom: 1px solid #444;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.2s;
        gap: 15px;
        flex-wrap: wrap;
    }
    .qpm-mass-actions-bar.hidden { display: none; }
    .qpm-mass-select-all {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(16,163,127,0.15);
        padding: 5px 12px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s;
    }
    .qpm-mass-select-all:hover {
        background: rgba(16,163,127,0.3);
    }
    .qpm-mass-select-all input {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: #10a37f;
        margin: 0;
    }
    .qpm-mass-info {
        font-size: 13px;
        color: #888;
        background: #1a1a1a;
        padding: 5px 12px;
        border-radius: 20px;
        white-space: nowrap;
    }
    .qpm-mass-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
    }
    .qpm-mass-btn {
        padding: 5px 14px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        border: none;
        transition: all 0.2s;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }
    .qpm-mass-btn.move {
        background: linear-gradient(145deg, #2a5a6a, #1a4a5a);
        color: #a8e4ff;
        border: 1px solid #3a8a9a;
    }
    .qpm-mass-btn.move:hover {
        background: linear-gradient(145deg, #3a8a9a, #2a7a8a);
        color: #fff;
        transform: scale(1.02);
    }
    .qpm-mass-btn.delete {
        background: linear-gradient(145deg, #6a2a2a, #5a1a1a);
        color: #ffa8a8;
        border: 1px solid #9a3a3a;
    }
    .qpm-mass-btn.delete:hover {
        background: linear-gradient(145deg, #9a3a3a, #8a2a2a);
        color: #fff;
        transform: scale(1.02);
    }
    .qpm-mass-btn.restore {
        background: linear-gradient(145deg, #2a6a4a, #1a5a3a);
        color: #a8ffd4;
        border: 1px solid #3a9a6a;
    }
    .qpm-mass-btn.restore:hover {
        background: linear-gradient(145deg, #3a9a6a, #2a8a5a);
        color: #fff;
        transform: scale(1.02);
    }
    .qpm-mass-btn.delete-permanent {
        background: linear-gradient(145deg, #6a2a2a, #5a1a1a);
        color: #ffa8a8;
        border: 1px solid #9a3a3a;
    }
    .qpm-mass-btn.delete-permanent:hover {
        background: linear-gradient(145deg, #9a3a3a, #8a2a2a);
        color: #fff;
        transform: scale(1.02);
    }
    .qpm-prompt-list { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
    .qpm-prompt-list::-webkit-scrollbar { width: 6px; }
    .qpm-prompt-list::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }
    .qpm-prompt-list::-webkit-scrollbar-track { background: transparent; }
    .qpm-prompt-item {
        background: #2f3136; padding: 12px; border-radius: 8px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid transparent; position: relative;
        display: flex; gap: 12px;
    }
    .qpm-prompt-item:hover { background: #3a3d42; border-color: #555; }
    .qpm-prompt-item.pinned { border-left: 3px solid #10a37f; background: #2a3530; }
    .qpm-prompt-item.favorited { border-left: 3px solid #ffd700; background: #2a2a20; }
    .qpm-prompt-item.selected {
        background: #1e3a2f;
        border-color: #10a37f;
        box-shadow: 0 0 0 1px #10a37f;
    }
    .qpm-prompt-item.dragging {
        opacity: 0.4; transform: scale(1.02);
        box-shadow: 0 8px 25px rgba(16, 163, 127, 0.3);
        border: 2px dashed #10a37f; background: #25302a;
    }
    .qpm-prompt-item.drag-over {
        border-top: 3px solid #10a37f; transform: translateY(-2px);
        background: #2a3530;
    }
    .qpm-prompt-item.trashed {
        opacity: 0.5;
        border-left: 3px solid #ff4444;
        background: #2a2020;
    }
    .qpm-prompt-item.trashed:hover {
        opacity: 0.7;
        background: #3a2525;
    }
    .qpm-prompt-item.trashed.selected {
        background: #3a2525;
        border-color: #ff6666;
    }
    .qpm-prompt-checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding-top: 2px;
    }
    .qpm-prompt-checkbox input {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: #10a37f;
        margin: 0;
    }
    .qpm-prompt-content {
        flex: 1;
        min-width: 0;
    }
    .qpm-prompt-name { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .qpm-prompt-name-icon { font-size: 16px; }
    .qpm-prompt-text {
        font-size: 13px; line-height: 1.5; color: #aaa; margin-bottom: 8px;
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .qpm-prompt-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
    .qpm-prompt-date { font-size: 11px; color: #666; }
    .qpm-prompt-pin-indicator { font-size: 12px; color: #10a37f; margin-right: 8px; display: none; }
    .qpm-prompt-item.pinned .qpm-prompt-pin-indicator { display: inline; }
    .qpm-prompt-actions { display: flex; gap: 4px; flex-wrap: wrap; }
    .qpm-prompt-actions button {
        padding: 3px 5px; border-radius: 4px; cursor: pointer;
        font-size: 10px; font-weight: 500; border: none;
        display: inline-flex; align-items: center; gap: 3px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative; overflow: hidden;
    }
    .qpm-prompt-actions button .btn-icon {
        font-size: 11px; transition: transform 0.2s;
    }
    .qpm-prompt-actions button.copy {
        background: linear-gradient(145deg, #2a4a6a, #1a3a5a);
        color: #a8d4ff; border: 1px solid #3a6a9a;
    }
    .qpm-prompt-actions button.duplicate {
        background: linear-gradient(145deg, #2a6a4a, #1a5a3a);
        color: #a8ffd4;
        border: 1px solid #3a9a6a;
    }
    .qpm-prompt-actions button.duplicate:hover {
        background: linear-gradient(145deg, #3a9a6a, #2a8a5a);
        color: #fff;
        transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(46, 204, 113, 0.4);
    }
    .qpm-prompt-actions button.duplicate:hover .btn-icon { transform: scale(1.2); }
    .qpm-prompt-actions button.copy:hover {
        background: linear-gradient(145deg, #3a6a9a, #2a5a8a);
        color: #fff; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(74, 158, 255, 0.4); border-color: #4a9eff;
    }
    .qpm-prompt-actions button.copy:hover .btn-icon { transform: scale(1.2) rotate(-5deg); }
    .qpm-prompt-actions button.preview {
        background: linear-gradient(145deg, #4a2a6a, #3a1a5a);
        color: #d4a8ff; border: 1px solid #6a3a9a;
    }
    .qpm-prompt-actions button.preview:hover {
        background: linear-gradient(145deg, #6a3a9a, #5a2a8a);
        color: #fff; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(155, 89, 182, 0.4); border-color: #9b59b6;
    }
    .qpm-prompt-actions button.preview:hover .btn-icon { transform: scale(1.2); }
    .qpm-prompt-actions button.edit {
        background: linear-gradient(145deg, #6a4a2a, #5a3a1a);
        color: #ffd4a8; border: 1px solid #9a7a3a;
    }
    .qpm-prompt-actions button.edit:hover {
        background: linear-gradient(145deg, #9a7a3a, #8a6a2a);
        color: #fff; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(255, 165, 0, 0.4); border-color: #ffa500;
    }
    .qpm-prompt-actions button.edit:hover .btn-icon { transform: scale(1.2) rotate(-15deg); }
    .qpm-prompt-actions button.move {
        background: linear-gradient(145deg, #2a5a6a, #1a4a5a);
        color: #a8e4ff; border: 1px solid #3a8a9a;
    }
    .qpm-prompt-actions button.move:hover {
        background: linear-gradient(145deg, #3a8a9a, #2a7a8a);
        color: #fff; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(52, 152, 219, 0.4); border-color: #3498db;
    }
    .qpm-prompt-actions button.move:hover .btn-icon { transform: scale(1.2) translateX(2px); }
    .qpm-prompt-actions button.pin {
        background: linear-gradient(145deg, #6a5a2a, #5a4a1a);
        color: #ffd4a8; border: 1px solid #9a8a3a;
    }
    .qpm-prompt-actions button.pin:hover {
        background: linear-gradient(145deg, #9a8a3a, #8a7a2a);
        color: #fff; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(241, 196, 15, 0.4); border-color: #f1c40f;
    }
    .qpm-prompt-actions button.pin:hover .btn-icon { transform: scale(1.2) rotate(15deg); }
    .qpm-prompt-actions button.pin.pinned {
        background: linear-gradient(145deg, #10a37f, #0e8c6d);
        color: #fff; border-color: #10a37f;
    }
    .qpm-prompt-actions button.favorite {
        background: linear-gradient(145deg, #6a5a2a, #5a4a1a);
        color: #ffd700; border: 1px solid #9a8a3a;
    }
    .qpm-prompt-actions button.favorite:hover {
        background: linear-gradient(145deg, #9a8a3a, #8a7a2a);
        color: #ffd700; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(255, 215, 0, 0.4);
    }
    .qpm-prompt-actions button.favorite.active {
        background: linear-gradient(145deg, #ffd700, #e6c200);
        color: #2a2a2a;
        border-color: #ffd700;
    }
    .qpm-prompt-actions button.tags {
        background: linear-gradient(145deg, #4a2a6a, #3a1a5a);
        color: #d4a8ff;
        border: 1px solid #6a3a9a;
    }
    .qpm-prompt-actions button.tags:hover {
        background: linear-gradient(145deg, #6a3a9a, #5a2a8a);
        color: #fff;
        transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(155, 89, 182, 0.4);
    }
    .qpm-prompt-actions button.history {
        background: linear-gradient(145deg, #e67e22, #d35400);
        color: white;
        border: 1px solid #f39c12;
    }
    .qpm-prompt-actions button.history:hover {
        background: linear-gradient(145deg, #f39c12, #e67e22);
        transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(230, 126, 34, 0.4);
    }
    .qpm-prompt-actions button.delete {
        background: linear-gradient(145deg, #6a2a2a, #5a1a1a);
        color: #ffa8a8; border: 1px solid #9a3a3a;
    }
    .qpm-prompt-actions button.delete:hover {
        background: linear-gradient(145deg, #9a3a3a, #8a2a2a);
        color: #fff; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(255, 68, 68, 0.4); border-color: #ff4444;
    }
    .qpm-prompt-actions button.delete:hover .btn-icon { transform: scale(1.2) rotate(10deg); }
    .qpm-prompt-actions button.restore {
        background: linear-gradient(145deg, #2a6a4a, #1a5a3a);
        color: #a8ffd4; border: 1px solid #3a9a6a;
    }
    .qpm-prompt-actions button.restore:hover {
        background: linear-gradient(145deg, #3a9a6a, #2a8a5a);
        color: #fff; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(46, 204, 113, 0.4);
    }
    .qpm-prompt-actions button.delete-permanent {
        background: linear-gradient(145deg, #6a2a2a, #5a1a1a);
        color: #ffa8a8; border: 1px solid #9a3a3a;
    }
    .qpm-prompt-actions button.delete-permanent:hover {
        background: linear-gradient(145deg, #9a3a3a, #8a2a2a);
        color: #fff; transform: translateY(-1px) scale(1.05);
        box-shadow: 0 3px 8px rgba(255, 68, 68, 0.4);
    }
    .qpm-drag-handle {
        cursor: grab; user-select: none; padding: 6px 10px; border-radius: 6px;
        background: linear-gradient(145deg, #3a3a3a, #2a2a2a);
        border: 1px solid #444; color: #888; font-size: 18px;
        display: inline-flex; align-items: center; justify-content: center;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        flex-shrink: 0;
    }
    .qpm-drag-handle:hover {
        background: linear-gradient(145deg, #4a4a4a, #3a3a3a);
        border-color: #666; color: #fff; transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
    .qpm-drag-handle:active, .qpm-drag-handle.grabbing {
        cursor: grabbing; background: linear-gradient(145deg, #10a37f, #0e8c6d);
        border-color: #10a37f; color: #fff; transform: scale(0.95);
        box-shadow: 0 2px 6px rgba(16, 163, 127, 0.4);
    }
    .qpm-drag-handle .drag-icon {
        display: inline-block; transition: transform 0.15s;
    }
    .qpm-drag-handle.grabbing .drag-icon { transform: scale(1.2) rotate(-10deg); }
    .qpm-empty-state { text-align: center; color: #666; padding: 40px 20px; }
    .qpm-empty-state-icon { font-size: 48px; margin-bottom: 15px; opacity: 0.5; }
    .qpm-editor-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); z-index: 100000;
        display: none; justify-content: center; align-items: center;
    }
    .qpm-editor {
        background: #202123; color: #ececf1; width: 600px; max-width: 95%;
        border-radius: 10px; padding: 25px; border: 1px solid #444;
        display: flex; flex-direction: column; gap: 15px;
    }
    .qpm-editor-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
    .qpm-editor-field { display: flex; flex-direction: column; gap: 5px; }
    .qpm-editor-field label { font-size: 13px; color: #888; font-weight: 500; }
    .qpm-editor-folder-select select {
        background: #1a1a1a; border: 1px solid #444; color: white;
        padding: 10px; border-radius: 6px; font-size: 14px;
    }
    .qpm-editor-name-input {
        background: #1a1a1a; border: 1px solid #444; color: white;
        padding: 10px 12px; border-radius: 6px; font-size: 14px;
    }
    .qpm-editor-name-input:focus { outline: none; border-color: #10a37f; }
    .qpm-editor-textarea {
        background: #1a1a1a; border: 1px solid #444; color: white;
        padding: 15px; border-radius: 6px; font-size: 14px;
        min-height: 200px; resize: vertical; font-family: inherit; line-height: 1.6;
    }
    .qpm-editor-textarea:focus { outline: none; border-color: #10a37f; }
    .qpm-editor-buttons { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
    .qpm-editor-btn { padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 14px; border: none; }
    .qpm-editor-btn-cancel { background: #444; color: white; }
    .qpm-editor-btn-cancel:hover { background: #555; }
    .qpm-editor-btn-save { background: #10a37f; color: white; }
    .qpm-editor-btn-save:hover { background: #0e8c6d; }
    .qpm-preview-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 100001;
        display: none; justify-content: center; align-items: center;
        backdrop-filter: blur(4px);
    }
    .qpm-preview {
        background: #202123; color: #ececf1; width: 700px; max-width: 95%;
        max-height: 80vh; border-radius: 10px; border: 1px solid #444;
        display: flex; flex-direction: column; box-shadow: 0 15px 50px rgba(0,0,0,0.7);
    }
    .qpm-preview-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 15px 20px; border-bottom: 1px solid #444; background: #2a2b2e;
        border-radius: 10px 10px 0 0;
    }
    .qpm-preview-title { font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
    .qpm-preview-close { cursor: pointer; font-size: 22px; color: #aaa; padding: 3px; border-radius: 4px; }
    .qpm-preview-close:hover { color: white; background: #444; }
    .qpm-preview-content {
        flex: 1; overflow-y: auto; padding: 20px; font-size: 14px; line-height: 1.7;
        white-space: pre-wrap; font-family: 'Consolas', 'Monaco', monospace;
    }
    .qpm-preview-content::-webkit-scrollbar { width: 8px; }
    .qpm-preview-content::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
    .qpm-preview-content::-webkit-scrollbar-track { background: transparent; }
    .qpm-preview-footer {
        padding: 12px 20px; border-top: 1px solid #444; display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap;
    }
    .qpm-preview-btn {
        padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; border: none; font-weight: 500;
        display: inline-flex; align-items: center; gap: 6px;
    }
    .qpm-preview-btn-copy { background: linear-gradient(145deg, #2a4a6a, #1a3a5a); color: #a8d4ff; border: 1px solid #3a6a9a; }
    .qpm-preview-btn-copy:hover { background: linear-gradient(145deg, #3a6a9a, #2a5a8a); color: #fff; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(74, 158, 255, 0.4); }
    .qpm-preview-btn-edit { background: linear-gradient(145deg, #6a4a2a, #5a3a1a); color: #ffd4a8; border: 1px solid #9a7a3a; }
    .qpm-preview-btn-edit:hover { background: linear-gradient(145deg, #9a7a3a, #8a6a2a); color: #fff; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255, 165, 0, 0.4); }
    .qpm-preview-btn-close { background: #444; color: white; }
    .qpm-preview-btn-close:hover { background: #555; }
    .qpm-toast {
        position: fixed; bottom: 30px; right: 30px; background: #10a37f;
        color: white; padding: 12px 20px; border-radius: 8px;
        font-size: 14px; font-weight: 500; z-index: 100002;
        box-shadow: 0 4px 20px rgba(0,0,0,0.4); display: none;
        animation: qpm-toast-slide 0.3s ease;
    }
    .qpm-toast.show { display: flex; align-items: center; gap: 8px; }
    .qpm-toast.error { background: #ff4444; }
    @keyframes qpm-toast-slide {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .qpm-highlight { background: rgba(16, 163, 127, 0.3); color: #fff; padding: 0 2px; border-radius: 2px; }
    #qpm-import-input { display: none; }
    .qpm-lang-select {
        background: #1a1a1a; border: 1px solid #444; color: white;
        padding: 6px 10px; border-radius: 6px; font-size: 13px;
        cursor: pointer;
    }
    .qpm-lang-select:focus { outline: none; border-color: #10a37f; }
    .qpm-sidebar-action-btn {
        width: 32px; height: 32px; border-radius: 6px; cursor: pointer;
        font-size: 16px; display: flex; align-items: center; justify-content: center;
        transition: all 0.2s; border: none;
    }
    .qpm-sidebar-action-btn.import {
        background: linear-gradient(145deg, #2a5a6a, #1a4a5a);
        color: #a8e4ff; border: 1px solid #3a8a9a;
    }
    .qpm-sidebar-action-btn.import:hover {
        background: linear-gradient(145deg, #3a8a9a, #2a7a8a);
        color: #fff; transform: scale(1.05);
        box-shadow: 0 3px 8px rgba(52, 152, 219, 0.4);
    }
    .qpm-sidebar-action-btn.export {
        background: linear-gradient(145deg, #5a4a6a, #4a3a5a);
        color: #d4a8ff; border: 1px solid #7a5a9a;
    }
    .qpm-sidebar-action-btn.export:hover {
        background: linear-gradient(145deg, #7a5a9a, #6a4a8a);
        color: #fff; transform: scale(1.05);
        box-shadow: 0 3px 8px rgba(155, 89, 182, 0.4);
    }
    .qpm-sidebar-action-btn.export-markdown {
        background: linear-gradient(145deg, #e67e22, #d35400);
        color: white;
        border: 1px solid #f39c12;
    }
    .qpm-sidebar-action-btn.export-markdown:hover {
        background: linear-gradient(145deg, #f39c12, #e67e22);
        transform: scale(1.05);
        box-shadow: 0 3px 8px rgba(230, 126, 34, 0.4);
    }
    .qpm-sidebar-action-btn.delete-all {
        background: linear-gradient(145deg, #6a2a2a, #5a1a1a);
        color: #ffa8a8; border: 1px solid #9a3a3a;
    }
    .qpm-sidebar-action-btn.delete-all:hover {
        background: linear-gradient(145deg, #9a3a3a, #8a2a2a);
        color: #fff; transform: scale(1.05);
        box-shadow: 0 3px 8px rgba(255, 68, 68, 0.4);
    }
    .qpm-sidebar-action-btn#qpm-trash-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 8px rgba(255, 68, 68, 0.4);
    }
    .qpm-save-indicator {
        position: fixed;
        top: 10px;
        right: 10px;
        background: #10a37f;
        color: white;
        padding: 8px 15px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 100003;
        display: none;
        animation: qpm-fade-out 2s ease forwards;
    }
    .qpm-save-indicator.show {
        display: block;
    }
    .qpm-save-indicator.error {
        background: #ff4444;
    }
    @keyframes qpm-fade-out {
        0% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
    .qpm-storage-badge {
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 4px;
        background: rgba(16, 163, 127, 0.2);
        color: #10a37f;
        margin-left: 8px;
    }
    .qpm-sync-badge {
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 4px;
        background: rgba(255, 215, 0, 0.2);
        color: #ffd700;
        margin-left: 8px;
        cursor: pointer;
    }
    .qpm-sync-badge:hover {
        background: rgba(255, 215, 0, 0.4);
    }
    .qpm-stats-bar {
        background: #1a1a1a;
        border-top: 1px solid #444;
        padding: 8px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        flex-wrap: wrap;
        gap: 10px;
    }
    .qpm-stats-item {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #2a2b2e;
        padding: 4px 12px;
        border-radius: 16px;
    }
    .qpm-stats-label {
        color: #888;
        font-size: 11px;
    }
    .qpm-stats-value {
        color: #10a37f;
        font-weight: bold;
        font-size: 14px;
    }
    .qpm-stats-value.warning {
        color: #ffa500;
    }
    .qpm-stats-value.danger {
        color: #ff4444;
    }
    .qpm-stats-bar .qpm-token-info {
        color: #888;
        font-size: 10px;
        cursor: help;
    }
    .qpm-stats-progress {
        width: 150px;
        height: 4px;
        background: #333;
        border-radius: 2px;
        overflow: hidden;
    }
    .qpm-stats-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #10a37f, #ffa500, #ff4444);
        transition: width 0.3s;
        border-radius: 2px;
    }
    .qpm-tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-top: 6px;
    }
    .qpm-tag {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: rgba(16, 163, 127, 0.15);
        border: 1px solid rgba(16, 163, 127, 0.3);
        color: #10a37f;
        font-size: 10px;
        padding: 2px 8px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
    }
    .qpm-tag:hover {
        background: rgba(16, 163, 127, 0.3);
        transform: scale(1.02);
    }
    .qpm-tag-add {
        background: rgba(255, 215, 0, 0.15);
        border: 1px dashed rgba(255, 215, 0, 0.5);
        color: #ffd700;
    }
    .qpm-tag-add:hover {
        background: rgba(255, 215, 0, 0.3);
    }
    .qpm-tag-remove {
        background: rgba(255, 68, 68, 0.15);
        border: 1px solid rgba(255, 68, 68, 0.3);
        color: #ff8888;
        font-size: 10px;
        padding: 2px 6px;
    }
    .qpm-tag-remove:hover {
        background: rgba(255, 68, 68, 0.3);
    }
    .qpm-tag-filter {
        background: rgba(16, 163, 127, 0.25);
        border: 1px solid #10a37f;
    }
    .qpm-tag-filter.active {
        background: #10a37f;
        color: white;
    }
    .qpm-tags-filter-bar {
        background: #2a2b2e;
        padding: 8px 15px;
        border-bottom: 1px solid #444;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
    }
    .qpm-tags-filter-label {
        font-size: 11px;
        color: #888;
        margin-right: 5px;
    }
    .qpm-tag-clear {
        background: none;
        border: none;
        color: #ff4444;
        cursor: pointer;
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 12px;
    }
    .qpm-tag-clear:hover {
        background: rgba(255, 68, 68, 0.2);
    }
    .qpm-tag-count {
        font-size: 9px;
        background: rgba(255,255,255,0.15);
        border-radius: 10px;
        padding: 1px 4px;
        margin-left: 3px;
    }
    .qpm-history-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: linear-gradient(145deg, #e67e22, #d35400);
        color: white;
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 12px;
        margin-left: 8px;
        cursor: pointer;
    }
    .qpm-history-badge:hover {
        background: linear-gradient(145deg, #f39c12, #e67e22);
        transform: scale(1.02);
    }
    .qpm-history-list {
        max-height: 400px;
        overflow-y: auto;
    }
    .qpm-history-item {
        background: #2a2b2e;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 10px;
        border-left: 3px solid #e67e22;
        position: relative;
    }
    .qpm-history-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
        gap: 8px;
    }
    .qpm-history-version {
        font-weight: bold;
        color: #e67e22;
        font-size: 12px;
    }
    .qpm-history-date {
        font-size: 11px;
        color: #888;
    }
    .qpm-history-name {
        font-size: 13px;
        font-weight: 500;
        color: #fff;
        margin-bottom: 5px;
    }
    .qpm-history-text {
        font-size: 12px;
        color: #aaa;
        line-height: 1.4;
        white-space: pre-wrap;
        word-break: break-word;
        max-height: 80px;
        overflow-y: auto;
        background: #1a1a1a;
        padding: 8px;
        border-radius: 4px;
        font-family: monospace;
    }
    .qpm-history-actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
        justify-content: flex-end;
    }
    .qpm-history-restore {
        background: linear-gradient(145deg, #e67e22, #d35400);
        border: none;
        color: white;
        padding: 4px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 11px;
    }
    .qpm-history-restore:hover {
        background: linear-gradient(145deg, #f39c12, #e67e22);
    }
    .qpm-history-delete {
        background: rgba(255,68,68,0.2);
        border: 1px solid #ff4444;
        color: #ff8888;
        padding: 4px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 11px;
    }
    .qpm-history-delete:hover {
        background: rgba(255,68,68,0.4);
    }
    .qpm-history-current {
        background: rgba(16,163,127,0.15);
        border-left-color: #10a37f;
    }
    .qpm-history-current .qpm-history-version {
        color: #10a37f;
    }
            /* Специфичные стили для кнопки на Алисе */
    .qpm-btn {
        cursor: pointer !important;
        pointer-events: auto !important;
        user-select: none !important;
    }

    .qpm-btn:hover {
        opacity: 1 !important;
        transform: translateY(-1px) !important;
    }

    .qpm-btn:active {
        transform: translateY(1px) !important;
    }
            /* Специфичные стили для GigaChat */
    .giga\\.chat .qpm-btn {
        background: linear-gradient(145deg, #10a37f, #0e8c6d);
        border-radius: 8px;
        font-size: 12px;
        padding: 6px 12px;
        height: 32px;
        margin-left: 8px !important;
        margin-right: 0 !important;
        order: -1 !important;
    }

    .giga\\.chat .styled__Group-sc-ac724d02-2 {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .giga\\.chat .qpm-btn {
        flex-shrink: 0;
    }
        /* Принудительное выравнивание кнопки в GigaChat */
    .giga\\.chat .styled__Group-sc-ac724d02-2 {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: flex-start !important;
    }

    .giga\\.chat .qpm-btn {
        margin-right: 8px !important;
        margin-left: 0 !important;
    }

    .giga\\.chat button[data-da_name="CallButton"] {
        margin-left: auto;
    }
`;

if (!document.getElementById('qpm-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'qpm-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
function testLocalStorage() {
    try {
        const test = 'qpm_test_' + Date.now();
        localStorage.setItem(test, 'test');
        const value = localStorage.getItem(test);
        localStorage.removeItem(test);
        return value === 'test';
    } catch (e) {
        return false;
    }
}

function escapeHtml(t) {
    if (!t) return '';
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// === ПОДСЧЁТ СИМВОЛОВ И ТОКЕНОВ ===
function countCharacters(text) {
    if (!text) return 0;
    return text.length;
}

function estimateTokens(text) {
    if (!text) return 0;
    let cyrillicChars = 0;
    let latinChars = 0;
    let otherChars = 0;
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if (code >= 0x0400 && code <= 0x04FF) {
            cyrillicChars++;
        } else if ((code >= 0x0041 && code <= 0x005A) || (code >= 0x0061 && code <= 0x007A)) {
            latinChars++;
        } else {
            otherChars++;
        }
    }
    const tokens = Math.ceil(cyrillicChars / 2) + Math.ceil(latinChars / 4) + Math.ceil(otherChars / 3);
    return Math.max(1, tokens);
}

function getContextLimit() {
    const host = window.location.hostname;
    if (host.includes('deepseek')) {
        return 16384;
    } else if (host.includes('qwen')) {
        return 8192;
    }
    return 8192;
}

function getWarningThreshold(limit) {
    return Math.floor(limit * 0.7);
}

function getDangerThreshold(limit) {
    return Math.floor(limit * 0.9);
}

function getStatsClass(tokens, limit) {
    if (tokens >= getDangerThreshold(limit)) return 'danger';
    if (tokens >= getWarningThreshold(limit)) return 'warning';
    return '';
}

// === ФУНКЦИИ ДЛЯ РАБОТЫ С ТЕГАМИ ===
let allTags = new Set();

function extractTagsFromPrompts() {
    allTags.clear();
    data.prompts.forEach(prompt => {
        if (prompt.tags && Array.isArray(prompt.tags)) {
            prompt.tags.forEach(tag => {
                if (tag && tag.trim()) allTags.add(tag.trim());
            });
        }
    });
    return Array.from(allTags).sort();
}

function addTagToPrompt(promptId, tag) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (prompt) {
        if (!prompt.tags) prompt.tags = [];
        tag = tag.trim();
        if (tag && !prompt.tags.includes(tag)) {
            prompt.tags.push(tag);
            saveData();
            renderPrompts(currentSearchQuery);
            return true;
        }
    }
    return false;
}

function removeTagFromPrompt(promptId, tag) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (prompt && prompt.tags) {
        const index = prompt.tags.indexOf(tag);
        if (index !== -1) {
            prompt.tags.splice(index, 1);
            if (prompt.tags.length === 0) delete prompt.tags;
            saveData();
            renderPrompts(currentSearchQuery);
            return true;
        }
    }
    return false;
}

function getPromptTags(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    return prompt?.tags || [];
}

function filterPromptsByTag(prompts, tag) {
    if (!tag) return prompts;
    return prompts.filter(p => p.tags && p.tags.includes(tag));
}

// === УМНЫЙ ПОИСК С ПОДДЕРЖКОЙ ТЕГОВ ===
function parseSearchQuery(query) {
    if (!query || !query.trim()) return { tags: [], text: '' };
    const tags = [];
    const regex = /#([\w\u0400-\u04FF\-]+)/g;
    let match;
    let remaining = query;
    while ((match = regex.exec(query)) !== null) {
        if (!tags.includes(match[1])) tags.push(match[1]);
        remaining = remaining.replace(match[0], '');
    }
    const text = remaining.trim().toLowerCase();
    return { tags, text };
}

function applySearchFilter(prompts, searchQuery) {
    if (!searchQuery) return prompts;
    const { tags: searchTags, text } = parseSearchQuery(searchQuery);
    return prompts.filter(p => {
        if (searchTags.length > 0) {
            if (!p.tags || p.tags.length === 0) return false;
            const matchesAllTags = searchTags.every(searchTag => {
                return p.tags.some(promptTag =>
                    promptTag.toLowerCase().includes(searchTag.toLowerCase())
                );
            });
            if (!matchesAllTags) return false;
        }
        if (text) {
            return (p.name && p.name.toLowerCase().includes(text)) ||
                   (p.text && p.text.toLowerCase().includes(text));
        }
        return true;
    });
}

// === АВТОКОМПЛИТ ТЕГОВ ПРИ ВВОДЕ # ===
let tagDropdown = null;
let currentTagSearch = '';

function createTagDropdown() {
    if (tagDropdown) return;
    const dropdown = document.createElement('div');
    dropdown.id = 'qpm-tag-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        background: #2a2b2e;
        border: 1px solid #444;
        border-radius: 6px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 100000;
        display: none;
        min-width: 150px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    `;
    document.body.appendChild(dropdown);
    tagDropdown = dropdown;
    document.addEventListener('click', (e) => {
        if (tagDropdown && !tagDropdown.contains(e.target)) {
            tagDropdown.style.display = 'none';
            currentTagSearch = '';
        }
    });
}

function updateTagDropdown(searchInput, cursorPos) {
    if (!tagDropdown) createTagDropdown();
    const text = searchInput.value;
    const beforeCursor = text.substring(0, cursorPos);
    const hashMatch = beforeCursor.match(/#([\w\u0400-\u04FF\-]*)$/);
    if (!hashMatch) {
        tagDropdown.style.display = 'none';
        currentTagSearch = '';
        return;
    }
    const searchTerm = hashMatch[1].toLowerCase();
    currentTagSearch = searchTerm;
    const allTagsSet = new Set();
    data.prompts.forEach(p => {
        if (p.tags && Array.isArray(p.tags)) {
            p.tags.forEach(tag => allTagsSet.add(tag));
        }
    });
    let allTags = Array.from(allTagsSet).sort();
    let filteredTags = allTags;
    if (searchTerm) {
        filteredTags = allTags.filter(tag => tag.toLowerCase().includes(searchTerm));
    }
    const displayTags = filteredTags.slice(0, 20);
    if (displayTags.length === 0) {
        tagDropdown.style.display = 'none';
        return;
    }
    const rect = searchInput.getBoundingClientRect();
    tagDropdown.style.left = rect.left + 'px';
    tagDropdown.style.top = (rect.bottom + 2) + 'px';
    tagDropdown.style.width = rect.width + 'px';
    let html = '';
    displayTags.forEach(tag => {
        html += `
            <div class="qpm-tag-dropdown-item" data-tag="${escapeHtml(tag)}" style="
                padding: 8px 12px;
                cursor: pointer;
                font-size: 13px;
                color: #10a37f;
                border-bottom: 1px solid #444;
                transition: background 0.2s;
            " onmouseover="this.style.backgroundColor='#3a3d42'" onmouseout="this.style.backgroundColor='transparent'">
                #${escapeHtml(tag)}
                ${filteredTags.length > 20 && displayTags.indexOf(tag) === displayTags.length - 1 ? `<span style="color:#666; font-size:10px; margin-left:8px;">+ ещё ${filteredTags.length - 20}</span>` : ''}
            </div>
        `;
    });
    tagDropdown.innerHTML = html;
    tagDropdown.style.display = 'block';
    tagDropdown.querySelectorAll('.qpm-tag-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const tag = item.dataset.tag;
            const beforeHash = text.substring(0, hashMatch.index);
            const afterCursor = text.substring(cursorPos);
            const newValue = beforeHash + '#' + tag + ' ' + afterCursor;
            searchInput.value = newValue;
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            tagDropdown.style.display = 'none';
            currentTagSearch = '';
            searchInput.focus();
        });
    });
}

const tagDropdownStyles = `
    .qpm-tag-dropdown-item:hover {
        background: #3a3d42 !important;
    }
    .qpm-tag-dropdown-item:last-child {
        border-bottom: none;
    }
    #qpm-tag-dropdown::-webkit-scrollbar {
        width: 6px;
    }
    #qpm-tag-dropdown::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 3px;
    }
`;

if (!document.getElementById('qpm-tag-dropdown-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'qpm-tag-dropdown-styles';
    styleSheet.innerText = tagDropdownStyles;
    document.head.appendChild(styleSheet);
}

// === ВЕРСИОНИРОВАНИЕ ПРОМПТОВ ===
function savePromptVersion(prompt) {
    if (!prompt) return;
    if (!prompt.history) prompt.history = [];
    const version = {
        id: 'ver_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        name: prompt.name,
        text: prompt.text,
        folderId: prompt.folderId,
        createdAt: Date.now(),
        versionNumber: (prompt.history.length + 1)
    };
    prompt.history.unshift(version);
    prompt.history.forEach((v, idx) => {
        v.versionNumber = prompt.history.length - idx;
    });
    if (prompt.history.length > 50) {
        prompt.history = prompt.history.slice(0, 50);
    }
    return version;
}

function restorePromptVersion(promptId, versionId, closeCallback = null) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (!prompt || !prompt.history) return false;
    const version = prompt.history.find(v => v.id === versionId);
    if (!version) return false;
    prompt.name = version.name;
    prompt.text = version.text;
    prompt.folderId = version.folderId;
    prompt.updatedAt = Date.now();
    saveData();
    showToast(t('versionApplied').replace('${version}', version.versionNumber).replace('${name}', version.name));
    renderPrompts(currentSearchQuery);
    renderFolders();
    if (closeCallback) closeCallback();
    return true;
}

function deleteVersionFromHistory(promptId, versionId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (!prompt || !prompt.history) return false;
    const index = prompt.history.findIndex(v => v.id === versionId);
    if (index !== -1) {
        prompt.history.splice(index, 1);
        prompt.history.forEach((v, idx) => {
            v.versionNumber = prompt.history.length - idx;
        });
        saveData();
        showToast(t('versionDeleted'));
        return true;
    }
    return false;
}

function showVersionHistory(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (!prompt) return;
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay';
    overlay.id = 'qpm-history-overlay';
    const history = prompt.history || [];
    let historyHtml = '';
    historyHtml += `
        <div class="qpm-history-item qpm-history-current">
            <div class="qpm-history-header">
                <span class="qpm-history-version">${t('currentVersion')}</span>
                <span class="qpm-history-date">${new Date(prompt.updatedAt || prompt.createdAt).toLocaleString()}</span>
            </div>
            <div class="qpm-history-name">${escapeHtml(prompt.name)}</div>
            <div class="qpm-history-text">${escapeHtml(prompt.text.substring(0, 200))}${prompt.text.length > 200 ? '...' : ''}</div>
        </div>
    `;
    if (history.length === 0) {
        historyHtml += `<div style="color:#888; text-align:center; padding:20px;">${t('noSavedVersions')}</div>`;
    } else {
        const sortedHistory = [...history].sort((a, b) => b.createdAt - a.createdAt);
        sortedHistory.forEach((v, idx) => {
            v.displayNumber = sortedHistory.length - idx;
        });
        historyHtml += `<div style="margin-top: 15px;"><div style="font-size: 12px; color: #888; margin-bottom: 10px;">${t('versionHistory')} (${sortedHistory.length}):</div>`;
        sortedHistory.forEach((version) => {
            const date = new Date(version.createdAt).toLocaleString();
            const versionNum = version.displayNumber;
            historyHtml += `
                <div class="qpm-history-item">
                    <div class="qpm-history-header">
                        <span class="qpm-history-version">${t('versionNum').replace('${num}', versionNum)}</span>
                        <span class="qpm-history-date">${date}</span>
                    </div>
                    <div class="qpm-history-name">${escapeHtml(version.name)}</div>
                    <div class="qpm-history-text">${escapeHtml(version.text.substring(0, 200))}${version.text.length > 200 ? '...' : ''}</div>
                    <div class="qpm-history-actions">
                        <button class="qpm-history-restore" data-version-id="${version.id}">${t('restoreThisVersion')}</button>
                        <button class="qpm-history-delete" data-version-id="${version.id}">${t('deleteThisVersion')}</button>
                    </div>
                </div>
            `;
        });
        historyHtml += `</div>`;
    }
    overlay.innerHTML = `
        <div class="qpm-preview" style="width: 700px; max-height: 85vh;">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">
                    📜 ${t('versionHistory')}: ${escapeHtml(prompt.name)}
                    <span style="font-size: 11px; background: #e67e22; padding: 2px 8px; border-radius: 12px; margin-left: 10px;">${history.length} ${t('versions') || 'versions'}</span>
                </div>
                <div class="qpm-preview-close" id="qpm-history-close">&times;</div>
            </div>
            <div style="padding: 20px; overflow-y: auto;" class="qpm-history-list">
                ${historyHtml}
                <div style="margin-top: 15px; padding: 10px; background: #1a1a1a; border-radius: 6px; font-size: 11px; color: #666; text-align: center;">
                    ${t('versionHistoryHint')}
                </div>
            </div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-history-done">${t('close')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('#qpm-history-close').addEventListener('click', close);
    overlay.querySelector('#qpm-history-done').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelectorAll('.qpm-history-restore').forEach(btn => {
        btn.addEventListener('click', () => {
            const versionId = btn.dataset.versionId;
            if (confirm(t('restoreThisVersion'))) {
                restorePromptVersion(prompt.id, versionId, close);
            }
        });
    });
    overlay.querySelectorAll('.qpm-history-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const versionId = btn.dataset.versionId;
            if (confirm(t('deleteThisVersion'))) {
                deleteVersionFromHistory(prompt.id, versionId);
                close();
                setTimeout(() => showVersionHistory(prompt.id), 100);
            }
        });
    });
    overlay.style.display = 'flex';
}

function showAddTagDialog(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (!prompt) return;
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay';
    overlay.id = 'qpm-tag-dialog';
    const existingTags = getPromptTags(promptId);
    const allAvailableTags = extractTagsFromPrompts();
    let tagsHtml = '';
    allAvailableTags.forEach(tag => {
        if (!existingTags.includes(tag)) {
            tagsHtml += `<span class="qpm-tag" data-tag="${escapeHtml(tag)}" style="cursor:pointer; background:rgba(16,163,127,0.1);">+ ${escapeHtml(tag)}</span>`;
        }
    });
    overlay.innerHTML = `
        <div class="qpm-preview" style="width: 400px; max-height: none;">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">${t('manageTagsFor').replace('${name}', escapeHtml(prompt.name))}</div>
                <div class="qpm-preview-close" id="qpm-tag-close">&times;</div>
            </div>
            <div style="padding: 20px;">
                <div style="margin-bottom: 15px;">
                    <div style="font-size: 12px; color: #888; margin-bottom: 8px;">${t('currentTagsLabel')}</div>
                    <div id="qpm-current-tags" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 15px;">
                        ${existingTags.length === 0 ? '<span style="color:#666; font-size:12px;">' + t('noTags') + '</span>' :
                            existingTags.map(tag => `<span class="qpm-tag qpm-tag-remove" data-tag="${escapeHtml(tag)}">#${escapeHtml(tag)} ✖️</span>`).join('')}
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div style="font-size: 12px; color: #888; margin-bottom: 8px;">${t('addTagLabel')}</div>
                    <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                        <input type="text" id="qpm-new-tag" placeholder="${t('newTagPlaceholder')}" style="flex:1; padding: 8px; background:#1a1a1a; border:1px solid #444; color:white; border-radius:6px;">
                        <button id="qpm-add-new-tag" style="background:#10a37f; border:none; color:white; padding:8px 15px; border-radius:6px; cursor:pointer;">➕</button>
                    </div>
                    <div id="qpm-existing-tags" style="display: flex; flex-wrap: wrap; gap: 5px;">
                        ${tagsHtml || '<span style="color:#666; font-size:12px;">' + t('noAvailableTags') + '</span>'}
                    </div>
                </div>
            </div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-tag-done">${t('close')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('#qpm-tag-close').addEventListener('click', close);
    overlay.querySelector('#qpm-tag-done').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#qpm-add-new-tag').addEventListener('click', () => {
        const newTag = overlay.querySelector('#qpm-new-tag').value.trim();
        if (newTag) {
            addTagToPrompt(promptId, newTag);
            close();
            setTimeout(() => showAddTagDialog(promptId), 100);
        }
    });
    overlay.querySelector('#qpm-new-tag').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            overlay.querySelector('#qpm-add-new-tag').click();
        }
    });
    overlay.querySelectorAll('#qpm-current-tags .qpm-tag-remove').forEach(el => {
        el.addEventListener('click', () => {
            const tag = el.dataset.tag;
            removeTagFromPrompt(promptId, tag);
            close();
            setTimeout(() => showAddTagDialog(promptId), 100);
        });
    });
    overlay.querySelectorAll('#qpm-existing-tags .qpm-tag').forEach(el => {
        el.addEventListener('click', () => {
            const tag = el.dataset.tag;
            addTagToPrompt(promptId, tag);
            close();
            setTimeout(() => showAddTagDialog(promptId), 100);
        });
    });
    overlay.style.display = 'flex';
}

function getProgressPercent(tokens, limit) {
    return Math.min(100, Math.round((tokens / limit) * 100));
}

function updateStatsDisplay(statsContainer, chars, tokens, limit) {
    if (!statsContainer) return;
    const charsSpan = statsContainer.querySelector('.qpm-stats-chars');
    const tokensSpan = statsContainer.querySelector('.qpm-stats-tokens');
    const progressFill = statsContainer.querySelector('.qpm-stats-progress-fill');
    const tokenInfo = statsContainer.querySelector('.qpm-token-info');
    if (charsSpan) charsSpan.textContent = chars.toLocaleString();
    if (tokensSpan) {
        tokensSpan.textContent = tokens.toLocaleString();
        const statsClass = getStatsClass(tokens, limit);
        tokensSpan.className = `qpm-stats-value ${statsClass}`;
    }
    if (progressFill) {
        const percent = getProgressPercent(tokens, limit);
        progressFill.style.width = `${percent}%`;
        if (percent >= 90) {
            progressFill.style.background = '#ff4444';
        } else if (percent >= 70) {
            progressFill.style.background = '#ffa500';
        } else {
            progressFill.style.background = '#10a37f';
        }
    }
    if (tokenInfo) {
        tokenInfo.title = `${t('tokenLimit')}: ${limit.toLocaleString()} ${t('tokens')}\n70% = ${getWarningThreshold(limit).toLocaleString()}\n90% = ${getDangerThreshold(limit).toLocaleString()}`;
    }
}

let pendingUpdateNotification = null;

// === ПРОВЕРКА ОБНОВЛЕНИЙ С ПОКАЗОМ УВЕДОМЛЕНИЯ В МЕНЕДЖЕРЕ ===
function checkForUpdates() {
    const lastVersion = localStorage.getItem('qpm_last_version');
    if (lastVersion !== SCRIPT_VERSION) {
        localStorage.setItem('qpm_last_version', SCRIPT_VERSION);
        
        pendingUpdateNotification = {
            version: SCRIPT_VERSION,
            changes: [
                '📥 Заменили буквы "I/E" на иконки 📥 (импорт) и 📤 (экспорт)'
            ]
        };
        
        if (modalOpen && modalEl) {
            showUpdateNotificationInModal();
        }
    }
}

function showUpdateNotificationInModal() {
    if (!pendingUpdateNotification || !modalEl) return;
    
    // Ищем контейнер для уведомлений (внизу модального окна, над статистикой)
    let notificationBar = modalEl.querySelector('#qpm-update-notification');
    if (!notificationBar) {
        // Создаём новый контейнер, если его нет
        notificationBar = document.createElement('div');
        notificationBar.id = 'qpm-update-notification';
        notificationBar.style.cssText = `
            background: linear-gradient(145deg, #2a5a6a, #1a4a5a);
            border-bottom: 1px solid #3a8a9a;
            color: #a8e4ff;
            padding: 10px 15px;
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        // Вставляем вверху основной области (после search-area, но перед масс-акшенс)
        const mainArea = modalEl.querySelector('.qpm-main');
        const searchArea = modalEl.querySelector('.qpm-search-area');
        if (mainArea && searchArea) {
            mainArea.insertBefore(notificationBar, searchArea.nextSibling);
        }
    }
    
    const versionText = t('updateNotification').replace('${version}', pendingUpdateNotification.version);
    notificationBar.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span>🎉 ${versionText}</span>
            <button id="qpm-view-changes-btn" style="
                background: rgba(255,215,0,0.2);
                border: 1px solid #ffd700;
                color: #ffd700;
                padding: 4px 12px;
                border-radius: 16px;
                cursor: pointer;
                font-size: 11px;
                transition: all 0.2s;
            ">${t('viewChanges')}</button>
        </div>
        <button id="qpm-dismiss-update" style="
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            font-size: 16px;
            padding: 0 6px;
        ">✖️</button>
    `;
    notificationBar.style.display = 'flex';
    
    // Обработчик для просмотра изменений
    const viewBtn = notificationBar.querySelector('#qpm-view-changes-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showChangelogModal();
        });
    }
    
    // Обработчик для закрытия уведомления
    const dismissBtn = notificationBar.querySelector('#qpm-dismiss-update');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationBar.style.display = 'none';
        });
    }
}

function showChangelogModal() {
    if (!pendingUpdateNotification) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay';
    overlay.id = 'qpm-changelog-overlay';
    
    const changesHtml = pendingUpdateNotification.changes.map(c => 
        `<li style="margin-bottom: 8px; color: #ddd;">${c}</li>`
    ).join('');
    
    overlay.innerHTML = `
        <div class="qpm-preview" style="width: 500px; max-width: 90%;">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">
                    🎉 ${t('updateNotification').replace('${version}', pendingUpdateNotification.version)}
                </div>
                <div class="qpm-preview-close" id="qpm-changelog-close">&times;</div>
            </div>
            <div style="padding: 20px;">
                <p style="color: #888; margin-bottom: 15px;">✨ Что нового:</p>
                <ul style="margin: 0; padding-left: 20px;">
                    ${changesHtml}
                </ul>
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #444; font-size: 12px; color: #666;">
                    💡 Спасибо, что используете Prompt Manager!
                </div>
            </div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-changelog-done">${t('close')}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    overlay.style.display = 'flex';
    
    const close = () => overlay.remove();
    overlay.querySelector('#qpm-changelog-close').addEventListener('click', close);
    overlay.querySelector('#qpm-changelog-done').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
}
    
function showToast(message, isError = false) {
    let toast = document.querySelector('.qpm-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'qpm-toast';
        toast.innerHTML = '<span>✓</span> <span class="qpm-toast-msg"></span>';
        document.body.appendChild(toast);
    }
    toast.querySelector('.qpm-toast-msg').textContent = message;
    toast.className = 'qpm-toast show' + (isError ? ' error' : '');
    setTimeout(() => toast.classList.remove('show'), 6000);
}

// === UNDO ДЛЯ МАССОВЫХ ОПЕРАЦИЙ ===
let undoStack = [];
let undoTimeout = null;

function addToUndo(action, data) {
    undoStack.push({
        action: action,
        data: data,
        timestamp: Date.now()
    });
    if (undoStack.length > 10) {
        undoStack.shift();
    }
    showUndoToast(action);
}

function showUndoToast(action) {
    let toast = document.querySelector('.qpm-undo-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'qpm-undo-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 30px;
            background: #2a2b2e;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 100002;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            border-left: 3px solid #10a37f;
        `;
        document.body.appendChild(toast);
    }
    let actionText = '';
    switch(action) {
        case 'massDelete': actionText = t('massDelete'); break;
        case 'massMove': actionText = t('massMove'); break;
        case 'massRestore': actionText = t('massRestore'); break;
        case 'massDeletePermanent': actionText = t('massDeletePermanent'); break;
        default: actionText = t('massDelete');
    }
    toast.innerHTML = `
        <span>✓ ${actionText}</span>
        <button id="qpm-undo-btn" style="
            background: #10a37f;
            border: none;
            color: white;
            padding: 4px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
        ">↩️ ${t('cancel')}</button>
    `;
    toast.style.display = 'flex';
    if (undoTimeout) clearTimeout(undoTimeout);
    undoTimeout = setTimeout(() => {
        if (toast) toast.style.display = 'none';
    }, 5000);
    const undoBtn = toast.querySelector('#qpm-undo-btn');
    const oldHandler = undoBtn._handler;
    if (oldHandler) undoBtn.removeEventListener('click', oldHandler);
    const handler = () => {
        performUndo();
        toast.style.display = 'none';
        if (undoTimeout) clearTimeout(undoTimeout);
    };
    undoBtn._handler = handler;
    undoBtn.addEventListener('click', handler);
}

function performUndo() {
    if (undoStack.length === 0) {
        showToast(t('undoNoActions'), true);
        return;
    }
    const lastAction = undoStack.pop();
    switch(lastAction.action) {
        case 'massDelete':
            lastAction.data.promptIds.forEach(promptId => {
                const prompt = data.prompts.find(p => p.id === promptId);
                if (prompt && prompt.deleted === true) {
                    prompt.deleted = false;
                    prompt.deletedAt = null;
                }
            });
            showToast(t('undoDelete'));
            break;
        case 'massMove':
            lastAction.data.items.forEach(item => {
                const prompt = data.prompts.find(p => p.id === item.promptId);
                if (prompt) {
                    prompt.folderId = item.oldFolderId;
                }
            });
            showToast(t('undoMove'));
            break;
        case 'massRestore':
            lastAction.data.promptIds.forEach(promptId => {
                const prompt = data.prompts.find(p => p.id === promptId);
                if (prompt && prompt.deleted === false) {
                    prompt.deleted = true;
                    prompt.deletedAt = lastAction.data.deletedAt || Date.now();
                }
            });
            showToast(t('undoRestore'));
            break;
        case 'massDeletePermanent':
            showToast(t('undoImpossible'), true);
            undoStack.pop();
            return;
        default:
            showToast(t('undoNoActions'), true);
            return;
    }
    saveData();
    if (currentFolderId === 'trash') {
        renderTrash();
    } else {
        renderPrompts(currentSearchQuery);
    }
    renderFolders();
    updateTrashBadge();
    updateMassActionsBar();
}

// === РЕЗЕРВНОЕ КОПИРОВАНИЕ ДАННЫХ ===
let backupStack = [];
const MAX_BACKUPS = 20;

function createBackup(reason = 'manual') {
    const backup = {
        id: 'backup_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        timestamp: Date.now(),
        reason: reason,
        data: JSON.parse(JSON.stringify(data)),
        foldersCount: data.folders.length,
        promptsCount: data.prompts.length
    };
    backupStack.unshift(backup);
    if (backupStack.length > MAX_BACKUPS) {
        backupStack.pop();
    }
    try {
        localStorage.setItem('qpm_backups', JSON.stringify(backupStack.map(b => ({
            id: b.id,
            timestamp: b.timestamp,
            reason: b.reason,
            foldersCount: b.foldersCount,
            promptsCount: b.promptsCount
        }))));
        localStorage.setItem('qpm_backup_data_' + backup.id, JSON.stringify(backup.data));
    } catch(e) {
        console.warn('QPM: Failed to save backup metadata', e);
    }
    if (reason !== 'auto') {
        showToast(t('backupCreated').replace('${reason}', reason), false);
    }
    return backup;
}

function loadBackup(backupId) {
    const backup = backupStack.find(b => b.id === backupId);
    if (!backup) {
        showToast(t('backupNotFound'), true);
        return false;
    }
    let backupData = backup.data;
    if (!backupData) {
        const stored = localStorage.getItem('qpm_backup_data_' + backupId);
        if (stored) {
            backupData = JSON.parse(stored);
        }
    }
    if (!backupData) {
        showToast(t('backupCorrupted'), true);
        return false;
    }
    createBackup('auto_before_restore');
    data = backupData;
    initFavoritesFolder();
    saveData();
    if (modalOpen && modalEl) {
        renderFolders();
        if (currentFolderId === 'trash') {
            renderTrash();
        } else {
            renderPrompts(currentSearchQuery);
        }
        updateTrashBadge();
        updateMassActionsBar();
    }
    showToast(t('backupRestored').replace('${date}', new Date(backup.timestamp).toLocaleString()), false);
    return true;
}

function showBackupDialog() {
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay';
    overlay.id = 'qpm-backup-overlay';
    let backupsHtml = '';
    if (backupStack.length === 0) {
        backupsHtml = '<div style="text-align:center; padding:40px; color:#888;">' + t('noBackups') + '</div>';
    } else {
        backupsHtml = '<div style="max-height: 400px; overflow-y: auto;">';
        backupStack.forEach((backup) => {
            const date = new Date(backup.timestamp).toLocaleString();
            const reasonText = {
                'manual': t('backupManual'),
                'auto_before_import': t('backupBeforeImport'),
                'auto_before_restore': t('backupBeforeRestore'),
                'auto_daily': t('backupDaily')
            }[backup.reason] || backup.reason;
            backupsHtml += `
                <div class="qpm-backup-item" style="
                    background: #2a2b2e;
                    border-radius: 8px;
                    padding: 12px;
                    margin-bottom: 10px;
                    border-left: 3px solid #10a37f;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <div style="font-weight: bold; color: #10a37f;">${reasonText}</div>
                            <div style="font-size: 11px; color: #888;">${date}</div>
                            <div style="font-size: 11px; color: #666; margin-top: 5px;">
                                📁 ${t('folders')}: ${backup.foldersCount} | 📋 ${t('allPrompts')}: ${backup.promptsCount}
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button class="qpm-backup-restore" data-id="${backup.id}" style="
                                background: linear-gradient(145deg, #2a5a6a, #1a4a5a);
                                border: none;
                                color: white;
                                padding: 6px 12px;
                                border-radius: 4px;
                                cursor: pointer;
                                font-size: 12px;
                            ">${t('backupRestoreBtn')}</button>
                            <button class="qpm-backup-delete" data-id="${backup.id}" style="
                                background: linear-gradient(145deg, #6a2a2a, #5a1a1a);
                                border: none;
                                color: #ffa8a8;
                                padding: 6px 12px;
                                border-radius: 4px;
                                cursor: pointer;
                                font-size: 12px;
                            ">${t('backupDeleteBtn')}</button>
                        </div>
                    </div>
                </div>
            `;
        });
        backupsHtml += '</div>';
    }
    overlay.innerHTML = `
        <div class="qpm-preview" style="width: 600px; max-height: 80vh;">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">${t('backupTitle').replace('${current}', backupStack.length).replace('${max}', MAX_BACKUPS)}</div>
                <div class="qpm-preview-close" id="qpm-backup-close">&times;</div>
            </div>
            <div style="padding: 20px;">
                <div style="margin-bottom: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button id="qpm-backup-create" style="
                        background: linear-gradient(145deg, #10a37f, #0e8c6d);
                        border: none;
                        color: white;
                        padding: 8px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                    ">${t('backupCreateNow')}</button>
                    <button id="qpm-backup-export" style="
                        background: linear-gradient(145deg, #5a4a6a, #4a3a5a);
                        border: none;
                        color: white;
                        padding: 8px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                    ">${t('backupExportAll')}</button>
                </div>
                <div style="border-top: 1px solid #444; margin: 15px 0;"></div>
                <div id="qpm-backup-list">
                    ${backupsHtml}
                </div>
                <div style="margin-top: 15px; font-size: 11px; color: #666; text-align: center;">
                    ${t('backupHint').replace('${max}', MAX_BACKUPS)}
                </div>
            </div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-backup-done">${t('close')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('#qpm-backup-close').addEventListener('click', close);
    overlay.querySelector('#qpm-backup-done').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#qpm-backup-create').addEventListener('click', () => {
        createBackup('manual');
        close();
        setTimeout(() => showBackupDialog(), 100);
    });
    overlay.querySelector('#qpm-backup-export').addEventListener('click', () => {
        const exportData = {
            exportDate: new Date().toISOString(),
            backups: backupStack.map(b => ({
                id: b.id,
                timestamp: b.timestamp,
                reason: b.reason,
                foldersCount: b.foldersCount,
                promptsCount: b.promptsCount,
                data: b.data || JSON.parse(localStorage.getItem('qpm_backup_data_' + b.id))
            }))
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qpm-backups-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast(t('backupExported'), false);
    });
    overlay.querySelectorAll('.qpm-backup-restore').forEach(btn => {
        btn.addEventListener('click', () => {
            const backupId = btn.dataset.id;
            if (confirm(t('restoreBackupConfirm'))) {
                loadBackup(backupId);
                close();
            }
        });
    });
    overlay.querySelectorAll('.qpm-backup-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const backupId = btn.dataset.id;
            if (confirm(t('deleteBackupConfirm'))) {
                const index = backupStack.findIndex(b => b.id === backupId);
                if (index !== -1) {
                    backupStack.splice(index, 1);
                    localStorage.removeItem('qpm_backup_data_' + backupId);
                    localStorage.setItem('qpm_backups', JSON.stringify(backupStack.map(b => ({
                        id: b.id,
                        timestamp: b.timestamp,
                        reason: b.reason,
                        foldersCount: b.foldersCount,
                        promptsCount: b.promptsCount
                    }))));
                    close();
                    setTimeout(() => showBackupDialog(), 100);
                    showToast(t('backupDeleted'), false);
                }
            }
        });
    });
    overlay.style.display = 'flex';
}

function loadBackupsFromStorage() {
    try {
        const savedBackupsMeta = localStorage.getItem('qpm_backups');
        if (savedBackupsMeta) {
            const backupsMeta = JSON.parse(savedBackupsMeta);
            backupStack = [];
            backupsMeta.forEach(meta => {
                backupStack.push({
                    id: meta.id,
                    timestamp: meta.timestamp,
                    reason: meta.reason,
                    foldersCount: meta.foldersCount,
                    promptsCount: meta.promptsCount,
                    data: null
                });
            });
        }
    } catch(e) {
        console.warn('QPM: Failed to load backups', e);
    }
}

function checkDailyBackup() {
    const lastBackupDate = localStorage.getItem('qpm_last_backup_date');
    const today = new Date().toDateString();
    if (lastBackupDate !== today) {
        createBackup('auto_daily');
        localStorage.setItem('qpm_last_backup_date', today);
    }
}

function showSaveIndicator(message, isError = false) {
    let indicator = document.querySelector('.qpm-save-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'qpm-save-indicator';
        indicator.style.cssText = `position: fixed; top: 10px; right: 10px; background: ${isError ? '#ff4444' : '#10a37f'}; color: white; padding: 10px 16px; border-radius: 8px; font-size: 12px; font-weight: 500; z-index: 100003; display: none; box-shadow: 0 4px 20px rgba(0,0,0,0.4); animation: qpm-fade-out 3s ease forwards; max-width: 280px; line-height: 1.4;`;
        document.body.appendChild(indicator);
    }
    let status = message;
    if (!isError && typeof GM_setValue !== 'undefined') {
        status += ` <br> <small style="opacity:0.9">🔒 GM: OK | 🌐 Local: OK</small>`;
    } else if (!isError) {
        status += ` <br> <small style="opacity:0.9">🌐 Local only</small>`;
    }
    indicator.innerHTML = status;
    indicator.className = 'qpm-save-indicator show' + (isError ? ' error' : '');
    indicator.style.animation = 'none';
    setTimeout(() => { indicator.style.animation = 'qpm-fade-out 5s ease forwards'; }, 10);
}

async function copyToClipboard(text) {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            const ta = document.createElement('textarea');
            ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); document.body.removeChild(ta);
        }
        return true;
    } catch (e) { return false; }
}

function insertTextToChat(text) {
    // Специальная обработка для Алисы
    if (currentHost === 'alice.yandex.ru') {
        const textarea = document.querySelector('textarea.AliceInput-Textarea');
        if (textarea) {
            // Фокусируемся на текстареа
            textarea.focus();

            // Вставляем текст
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const currentValue = textarea.value;
            const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);

            // Устанавливаем новое значение
            textarea.value = newValue;

            // Перемещаем курсор в конец
            textarea.selectionStart = textarea.selectionEnd = start + text.length;

            // Триггерим события
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            textarea.dispatchEvent(new Event('change', { bubbles: true }));

            // Автоматически расширяем высоту (имитация нажатия Enter для Алисы)
            setTimeout(() => {
                textarea.style.height = 'auto';
                textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
            }, 10);

            return true;
        }
    }
    // Специальная обработка для GigaChat
    if (currentHost === 'giga.chat') {
        const textarea = document.querySelector('textarea, [role="textbox"]');
        if (textarea) {
            textarea.focus();

            // Проверяем, есть ли уже текст
            const currentValue = textarea.value || '';
            const newValue = currentValue ? currentValue + '\n' + text : text;

            // Устанавливаем значение
            textarea.value = newValue;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            textarea.dispatchEvent(new Event('change', { bubbles: true }));

            // Для contenteditable
            if (textarea.getAttribute('contenteditable') === 'true') {
                textarea.focus();
                document.execCommand('insertText', false, text);
            }

            return true;
        }
    }

    // Стандартная обработка для других сайтов
    const selectors = config.textarea.split(',').map(s => s.trim());
    let el = null;
    for (const selector of selectors) {
        el = document.querySelector(selector);
        if (el && el.tagName === 'TEXTAREA') break;
    }
    if (!el) el = document.querySelector('textarea');

    if (el) {
        const nativeSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set;
        if (nativeSetter) {
            const newValue = el.value ? el.value + '\n' + text : text;
            nativeSetter.call(el, newValue);
        } else {
            el.value = el.value ? el.value + '\n' + text : text;
        }
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.focus();
        el.scrollTop = el.scrollHeight;
        return true;
    }

    el = document.querySelector('[contenteditable="true"]');
    if (el) {
        el.focus();
        document.execCommand('insertText', false, text);
        return true;
    }

    return false;
}

function initFavoritesFolder() {
    const favoritesExists = data.folders.some(f => f.id === FAVORITES_FOLDER_ID);
    if (!favoritesExists) {
        data.folders.unshift({
            id: FAVORITES_FOLDER_ID,
            name: '⭐ Избранное',
            parentId: null,
            createdAt: Date.now(),
            isProtected: true,
            isFavorites: true
        });
    } else {
        const favFolder = data.folders.find(f => f.id === FAVORITES_FOLDER_ID);
        if (favFolder) {
            favFolder.isProtected = true;
            favFolder.isFavorites = true;
            // Убираем лишнюю звездочку, оставляем только одну
            if (favFolder.name !== '⭐ Избранное' && !favFolder.name.startsWith('⭐')) {
                favFolder.name = '⭐ Избранное';
            } else if (favFolder.name === 'Избранное') {
                favFolder.name = '⭐ Избранное';
            }
        }
    }
}

function isFavoritePrompt(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    return prompt && prompt.folderId === FAVORITES_FOLDER_ID;
}

function addToFavorites(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (prompt && prompt.folderId !== FAVORITES_FOLDER_ID) {
        prompt.folderId = FAVORITES_FOLDER_ID;
        saveData();
        showToast('⭐ ' + t('favorite'));
        renderPrompts(currentSearchQuery);
        renderFolders();
    }
}

function removeFromFavorites(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (prompt && prompt.folderId === FAVORITES_FOLDER_ID) {
        prompt.folderId = null;
        saveData();
        showToast(t('unfavorite'));
        if (currentFolderId === FAVORITES_FOLDER_ID) {
            renderPrompts(currentSearchQuery);
        }
        renderFolders();
    }
}

function toggleFavorite(promptId) {
    if (isFavoritePrompt(promptId)) {
        removeFromFavorites(promptId);
    } else {
        addToFavorites(promptId);
    }
}

function autoCleanTrash() {
    const now = Date.now();
    const originalCount = data.prompts.filter(p => p.deleted === true).length;
    data.prompts = data.prompts.filter(p => {
        if (p.deleted === true && p.deletedAt) {
            const age = now - p.deletedAt;
            return age < TRASH_CLEANUP_MS;
        }
        return true;
    });
    const cleanedCount = originalCount - data.prompts.filter(p => p.deleted === true).length;
    if (cleanedCount > 0) {
        console.log(`QPM: Auto-cleaned ${cleanedCount} old trash items`);
        saveData(false);
    }
    return cleanedCount;
}

function moveToTrash(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (prompt && !prompt.deleted) {
        prompt.deleted = true;
        prompt.deletedAt = Date.now();
        saveData();
        showToast(t('promptMoved') + ' 🗑️');
        if (currentFolderId === 'trash') {
            renderTrash();
        } else {
            selectedPrompts.delete(promptId);
            renderPrompts(currentSearchQuery);
        }
        renderFolders();
        updateTrashBadge();
        updateMassActionsBar();
    }
}

function restoreFromTrash(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (prompt && prompt.deleted) {
        prompt.deleted = false;
        prompt.deletedAt = null;
        saveData();
        showToast(t('restoreSuccess'));
        if (currentFolderId === 'trash') {
            selectedPrompts.delete(promptId);
            renderTrash();
        }
        renderFolders();
        updateTrashBadge();
        updateMassActionsBar();
    }
}

function deletePermanently(promptId) {
    if (!confirm(t('deletePermanentConfirm'))) return;
    data.prompts = data.prompts.filter(p => p.id !== promptId);
    selectedPrompts.delete(promptId);
    saveData();
    if (currentFolderId === 'trash') {
        renderTrash();
    }
    renderFolders();
    updateTrashBadge();
    updateMassActionsBar();
}

function emptyTrash() {
    if (!confirm(t('emptyTrashConfirm'))) return;
    const trashCount = data.prompts.filter(p => p.deleted === true).length;
    data.prompts = data.prompts.filter(p => p.deleted !== true);
    selectedPrompts.clear();
    saveData();
    if (currentFolderId === 'trash') {
        renderTrash();
    }
    renderFolders();
    updateTrashBadge();
    updateMassActionsBar();
    showToast(`🗑️ ${trashCount} ` + t('foldersDeleted'));
}

function getTrashPrompts() {
    return data.prompts.filter(p => p.deleted === true);
}

function updateTrashBadge() {
    const trashBtn = document.querySelector('#qpm-trash-btn');
    if (trashBtn) {
        const count = getTrashPrompts().length;
        if (count > 0) {
            trashBtn.innerHTML = `🗑️ <span style="background:#ff4444;color:white;font-size:10px;padding:2px 6px;border-radius:10px;margin-left:4px">${count}</span>`;
        } else {
            trashBtn.innerHTML = '🗑️';
        }
    }
}

// === ЭКСПОРТ В MARKDOWN ===
function exportToMarkdown() {
    const activePrompts = data.prompts.filter(p => p.deleted !== true);
    if (activePrompts.length === 0) {
        showToast(t('noPromptsForExport'), true);
        return;
    }
    let md = `# 📚 ${t('title')}\n\n`;
    md += `**${t('export')}:** ${new Date().toLocaleString()}\n`;
    md += `**${t('allPrompts')}:** ${activePrompts.length}\n`;
    md += `**${t('folders')}:** ${data.folders.filter(f => !f.isProtected).length}\n\n`;
    md += `---\n\n`;
    function getFolderPath(folderId) {
        if (!folderId) return '📂 ' + t('noFolder');
        const folder = data.folders.find(f => f.id === folderId);
        if (!folder) return '📂 ' + t('noFolder');
        function getPath(f, parts = []) {
            parts.unshift(f.name);
            if (f.parentId) {
                const parent = data.folders.find(p => p.id === f.parentId);
                if (parent && !parent.isProtected) getPath(parent, parts);
            }
            return parts;
        }
        return '📂 ' + getPath(folder).join(' / ');
    }
    const promptsByFolder = {};
    activePrompts.forEach(prompt => {
        const folderKey = prompt.folderId || 'root';
        if (!promptsByFolder[folderKey]) promptsByFolder[folderKey] = [];
        promptsByFolder[folderKey].push(prompt);
    });
    for (const folderId in promptsByFolder) {
        promptsByFolder[folderId].sort((a, b) => (b.order || b.createdAt) - (a.order || a.createdAt));
    }
    if (promptsByFolder['root']) {
        md += `## 📂 ${t('noFolder')}\n\n`;
        for (const prompt of promptsByFolder['root']) {
            md += formatPromptAsMarkdown(prompt, null);
        }
        delete promptsByFolder['root'];
    }
    const sortedFolders = Object.keys(promptsByFolder).sort();
    for (const folderId of sortedFolders) {
        const folder = data.folders.find(f => f.id === folderId);
        if (!folder || folder.isProtected) continue;
        const folderPath = getFolderPath(folderId);
        md += `## ${folderPath}\n\n`;
        for (const prompt of promptsByFolder[folderId]) {
            md += formatPromptAsMarkdown(prompt, folder);
        }
    }
    const favorites = activePrompts.filter(p => p.folderId === FAVORITES_FOLDER_ID);
    if (favorites.length > 0) {
        md += `## ⭐ ${t('favorites')}\n\n`;
        for (const prompt of favorites) {
            md += formatPromptAsMarkdown(prompt, null, true);
        }
    }
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompts-export-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t('exportMarkdownSuccess'));
}

function formatPromptAsMarkdown(prompt, folder, isFavorite = false) {
    const date = new Date(prompt.createdAt).toLocaleString();
    const tags = (prompt.tags || []).map(t => `\`#${t}\``).join(' ');
    const hasVars = hasVariables(prompt.text);
    const versionCount = prompt.history ? prompt.history.length : 0;
    let md = `### ${isFavorite ? '⭐ ' : ''}${escapeMarkdown(prompt.name)}\n\n`;
    md += `| ${t('promptName')} | ${t('promptText')} |\n`;
    md += `|----------|----------|\n`;
    md += `| 📅 ${t('promptName')} | ${date} |\n`;
    md += `| 🏷️ ${t('tags')} | ${tags || '—'} |\n`;
    if (folder && !isFavorite) md += `| 📁 ${t('folder')} | ${escapeMarkdown(folder.name)} |\n`;
    if (hasVars) md += `| 🔧 ${t('variables')} | ✅ ${t('templateBadge')} |\n`;
    if (versionCount > 0) md += `| 📜 ${t('versionHistory')} | ${versionCount} |\n`;
    if (prompt.pinned) md += `| 📌 ${t('pin')} | ✅ |\n`;
    md += `\n**${t('promptText')}:**\n\n`;
    md += `\`\`\`\n${prompt.text}\n\`\`\`\n\n`;
    md += `---\n\n`;
    return md;
}

function escapeMarkdown(text) {
    if (!text) return '';
    return text.replace(/([\\`*_{}[\]()#+\-.!])/g, '\\$1');
}

function exportPrompts() {
    const exportData = {
        version: '2.0',
        exportDate: new Date().toISOString(),
        folders: data.folders,
        prompts: data.prompts,
        note: 'Universal Prompt Manager - with template variables support'
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompts-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t('exportSuccess'));
}

function importPrompts(file) {
    createBackup('auto_before_import');
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importData = JSON.parse(e.target.result);
            if (!importData.prompts || !Array.isArray(importData.prompts)) {
                throw new Error('Invalid format');
            }
            if (importData.folders && Array.isArray(importData.folders)) {
                const idMap = {};
                importData.folders.forEach(f => {
                    if (f.id === FAVORITES_FOLDER_ID) return;
                    const newId = 'folder_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                    idMap[f.id] = newId;
                });
                importData.folders.forEach(f => {
                    if (f.id === FAVORITES_FOLDER_ID) return;
                    if (f.parentId && idMap[f.parentId]) f.parentId = idMap[f.parentId];
                    if (idMap[f.id]) f.id = idMap[f.id];
                });
                const newFolders = importData.folders.filter(f => f.id !== FAVORITES_FOLDER_ID);
                data.folders = [...data.folders, ...newFolders];
            }
            if (importData.prompts) {
                importData.prompts.forEach(p => {
                    p.id = 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                    p.createdAt = Date.now();
                    p.order = Date.now();
                    p.deleted = false;
                    p.deletedAt = null;
                });
                data.prompts = [...data.prompts, ...importData.prompts];
            }
            initFavoritesFolder();
            saveData();
            renderFolders();
            renderPrompts();
            showToast(t('importSuccess') + importData.prompts.length);
        } catch (err) {
            console.error('QPM: Import error', err);
            showToast(t('importError') + err.message, true);
        }
    };
    reader.readAsText(file);
}

function openPreview(prompt) {
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay'; overlay.id = 'qpm-preview-overlay';
    overlay.innerHTML = `
        <div class="qpm-preview">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">📋 ${escapeHtml(prompt.name)}</div>
                <div class="qpm-preview-close" id="qpm-preview-close">&times;</div>
            </div>
            <div class="qpm-preview-content" id="qpm-preview-content"></div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-preview-cancel">${t('close')}</button>
                <button class="qpm-preview-btn qpm-preview-btn-edit" id="qpm-preview-edit">✏️ ${t('edit')}</button>
                <button class="qpm-preview-btn qpm-preview-btn-copy" id="qpm-preview-copy">📋 ${t('copy')}</button>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#qpm-preview-content').textContent = prompt.text;
    const close = () => overlay.remove();
    overlay.querySelector('#qpm-preview-close').addEventListener('click', close);
    overlay.querySelector('#qpm-preview-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#qpm-preview-edit').addEventListener('click', () => {
        close();
        setTimeout(() => openEditor(prompt.id), 100);
    });
    overlay.querySelector('#qpm-preview-copy').addEventListener('click', async () => {
        const ok = await copyToClipboard(prompt.text);
        showToast(ok ? t('copied') : t('error'), !ok);
    });
    overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    overlay.style.display = 'flex';
}

// === ФУНКЦИИ ПАПОК ===
function getChildrenFolders(parentId) {
    return data.folders.filter(f => f.parentId === parentId && f.id !== FAVORITES_FOLDER_ID);
}

function getChildCount(folderId) {
    let count = data.prompts.filter(p => p.folderId === folderId && p.deleted !== true).length;
    if (folderId === FAVORITES_FOLDER_ID) {
        const subFolders = getChildrenFolders(folderId);
        subFolders.forEach(sub => {
            count += getChildCount(sub.id);
        });
    }
    return count;
}

function getDescendantCount(folderId) {
    const children = getChildrenFolders(folderId);
    let count = getChildCount(folderId);
    children.forEach(child => {
        count += getDescendantCount(child.id);
    });
    return count;
}

function hasChildren(folderId) {
    return getChildrenFolders(folderId).length > 0;
}

function isExpanded(folderId) {
    return expandedFolders[folderId] !== false;
}

function toggleExpand(folderId) {
    expandedFolders[folderId] = !isExpanded(folderId);
    saveData();
    renderFolders();
}

function createFolder(parentId) {
    const name = prompt(t('createFolder') + ':');
    if (name && name.trim()) {
        data.folders.push({
            id: 'folder_' + Date.now(),
            name: name.trim(),
            parentId: parentId,
            createdAt: Date.now()
        });
        if (parentId) {
            expandedFolders[parentId] = true;
        }
        saveData();
        renderFolders();
    }
}

function editFolderName(folderId) {
    const folder = data.folders.find(f => f.id === folderId);
    if (!folder) return;
    if (folder.isProtected) {
        showToast(t('cannotDeleteFavorite'), true);
        return;
    }
    const newName = prompt(t('renameFolder'), folder.name);
    if (newName && newName.trim() && newName.trim() !== folder.name) {
        folder.name = newName.trim();
        saveData();
        renderFolders();
        showToast(t('folderRenamed'));
    }
}

function deleteFolder(folderId) {
    if (folderId === FAVORITES_FOLDER_ID) {
        showToast(t('cannotDeleteFavorite'), true);
        return;
    }
    const folder = data.folders.find(f => f.id === folderId);
    if (!folder) return;

    const descendantCount = getDescendantCount(folderId);

    // Проверяем, является ли папка подпапкой в Избранном
    const isSubfolderInFavorites = (folder.parentId === FAVORITES_FOLDER_ID);

    if (descendantCount > 0) {
        const confirmMessage = isSubfolderInFavorites
            ? t('deleteSubfolderConfirm').replace('{name}', folder.name).replace('{count}', descendantCount)
            : t('movePromptsConfirm') + descendantCount + t('moveToParent');
        if (!confirm(confirmMessage)) return;
    }

    // Перемещаем промпты
    data.prompts.forEach(p => {
        if (p.folderId === folderId) {
            if (isSubfolderInFavorites) {
                // Если это подпапка в Избранном - промпты перемещаются в корневую папку Избранного
                p.folderId = FAVORITES_FOLDER_ID;
            } else {
                // Обычная папка - промпты в родительскую папку или в корень
                p.folderId = folder.parentId || null;
            }
        }
    });

    function deleteRecursive(fid) {
        const children = getChildrenFolders(fid);
        children.forEach(child => deleteRecursive(child.id));
        data.folders = data.folders.filter(f => f.id !== fid);
    }
    deleteRecursive(folderId);

    if (currentFolderId === folderId) currentFolderId = 'all';
    clearSelection();
    saveData();
    renderFolders();
    renderPrompts();

    if (isSubfolderInFavorites) {
        showToast(t('subfolderInFavorites') + ' ' + t('foldersDeleted'));
    }
}

function deleteAllFoldersMenu() {
    const regularFolders = data.folders.filter(f => !f.isProtected && f.id !== FAVORITES_FOLDER_ID);
    if (regularFolders.length === 0) {
        showToast(t('noPrompts'), true);
        return;
    }
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay';
    overlay.id = 'qpm-delete-all-overlay';
    const totalPrompts = data.prompts.filter(p => {
        const folder = data.folders.find(f => f.id === p.folderId);
        return p.folderId !== null && p.folderId !== FAVORITES_FOLDER_ID && (!folder || !folder.isProtected) && p.deleted !== true;
    }).length;
    overlay.innerHTML = `
        <div class="qpm-preview" style="width: 500px; max-height: none;">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">🗑️ ${t('deleteAllFolders')}</div>
                <div class="qpm-preview-close" id="qpm-delete-all-close">&times;</div>
            </div>
            <div style="padding: 20px;">
                <p style="margin-bottom: 15px; color: #aaa;">
                    ${t('folders')}: <strong style="color: #fff;">${regularFolders.length}</strong>,
                    ${t('prompts')}: <strong style="color: #fff;">${totalPrompts}</strong>
                    <br><small style="color: #ffd700;">⭐ ${t('favoriteFolderProtected')}</small>
                </p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button class="qpm-preview-btn" id="qpm-delete-with-content" style="background: linear-gradient(145deg, #6a2a2a, #5a1a1a); color: #ffa8a8; border: 1px solid #9a3a3a; width: 100%; justify-content: center;">
                        🗑️ ${t('deleteWithContent')}
                    </button>
                    <button class="qpm-preview-btn" id="qpm-delete-without-content" style="background: linear-gradient(145deg, #6a4a2a, #5a3a1a); color: #ffd4a8; border: 1px solid #9a7a3a; width: 100%; justify-content: center;">
                        📁 ${t('deleteWithoutContent')}
                    </button>
                </div>
                <p style="margin-top: 15px; font-size: 12px; color: #666;">
                    ⚠️ ${t('allPrompts')} ${t('noFolder')}
                    <br>⭐ ${t('favoriteFolderProtected')}
                </p>
            </div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-delete-all-cancel">${t('cancel')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('#qpm-delete-all-close').addEventListener('click', close);
    overlay.querySelector('#qpm-delete-all-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#qpm-delete-with-content').addEventListener('click', () => {
        if (confirm(t('deleteConfirm'))) {
            data.prompts = data.prompts.filter(p => p.folderId === null || p.folderId === FAVORITES_FOLDER_ID);
            data.folders = data.folders.filter(f => f.isProtected || f.id === FAVORITES_FOLDER_ID);
            saveData();
            currentFolderId = 'all';
            clearSelection();
            renderFolders();
            renderPrompts();
            close();
            showToast(t('foldersDeleted'));
        }
    });
    overlay.querySelector('#qpm-delete-without-content').addEventListener('click', () => {
        if (confirm(t('movePromptsToRoot'))) {
            data.prompts.forEach(p => {
                const folder = data.folders.find(f => f.id === p.folderId);
                if (folder && !folder.isProtected && folder.id !== FAVORITES_FOLDER_ID) {
                    p.folderId = null;
                }
            });
            data.folders = data.folders.filter(f => f.isProtected || f.id === FAVORITES_FOLDER_ID);
            saveData();
            currentFolderId = 'all';
            clearSelection();
            renderFolders();
            renderPrompts();
            close();
            showToast(t('foldersDeletedPromptsSaved'));
        }
    });
    overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    overlay.style.display = 'flex';
}

function renderFolderTree(parentId, level = 0) {
    const children = getChildrenFolders(parentId);
    if (children.length === 0) return '';
    let html = '<ul class="qpm-folder-tree">';
    children.forEach(folder => {
        const count = getDescendantCount(folder.id);
        const hasSub = hasChildren(folder.id);
        const expanded = isExpanded(folder.id);
        const isActive = currentFolderId === folder.id;
        const isProtected = folder.isProtected === true;
        const isSubfolderInFavorites = (folder.parentId === FAVORITES_FOLDER_ID);

        html += `
            <li>
                <div class="qpm-folder-item ${isActive ? 'active' : ''} ${isProtected ? 'protected' : ''} ${isSubfolderInFavorites ? 'subfolder-in-favorites' : ''}" data-folder-id="${folder.id}">
                    <div class="qpm-folder-content">
                        <span class="qpm-folder-toggle ${hasSub ? '' : 'hidden'} ${expanded ? 'expanded' : ''}" data-toggle="${folder.id}">▶</span>
                        <span class="qpm-folder-icon">📁</span>
                        <span class="qpm-folder-name" title="${escapeHtml(folder.name)}">${escapeHtml(folder.name)}</span>
                        <span class="qpm-folder-count">${count}</span>
                    </div>
                    <div class="qpm-folder-actions">
                        <button class="edit" title="${t('editFolder')}" data-edit="${folder.id}">✏️</button>
                        <button class="subfolder" title="${t('subfolder')}" data-subfolder="${folder.id}">📂</button>
                        <button class="delete" title="${t('deleteFolder')}" data-delete="${folder.id}">🗑️</button>
                    </div>
                </div>
                ${expanded ? renderFolderTree(folder.id, level + 1) : ''}
            </li>`;
    });
    html += '</ul>';
    return html;
}

function renderFolders() {
    if (!modalEl) return;
    const list = modalEl.querySelector('#qpm-folder-list');
    if (!list) return;
    const allCount = data.prompts.filter(p => p.deleted !== true).length;
    const favoritesCount = data.prompts.filter(p => p.folderId === FAVORITES_FOLDER_ID && p.deleted !== true).length;
    const favHasChildren = hasChildren(FAVORITES_FOLDER_ID);
    const favExpanded = isExpanded(FAVORITES_FOLDER_ID);
    let html = `
        <div class="qpm-folder-item ${currentFolderId === 'all' ? 'active' : ''}" data-folder-id="all">
            <div class="qpm-folder-content">
                <span class="qpm-folder-toggle hidden"></span>
                <span class="qpm-folder-icon">📂</span>
                <span class="qpm-folder-name">${t('allPrompts')}</span>
                <span class="qpm-folder-count">${allCount}</span>
            </div>
        </div>
        <div class="qpm-folder-item ${currentFolderId === FAVORITES_FOLDER_ID ? 'active' : ''} protected" data-folder-id="${FAVORITES_FOLDER_ID}">
    <div class="qpm-folder-content">
        <span class="qpm-folder-toggle ${favHasChildren ? '' : 'hidden'} ${favExpanded ? 'expanded' : ''}" data-toggle="${FAVORITES_FOLDER_ID}">▶</span>
        <span class="qpm-folder-icon">⭐</span>
        <span class="qpm-folder-name">${t('favorites')}</span>
        <span class="qpm-folder-count">${favoritesCount}</span>
    </div>
    <div class="qpm-folder-actions">
        <button class="subfolder" title="${t('subfolder')}" data-subfolder="${FAVORITES_FOLDER_ID}">📂</button>
        <button class="delete disabled" title="${t('cannotDeleteFavorite')}" disabled style="opacity:0.5;cursor:not-allowed;">🔒</button>
    </div>
</div>
    `;
    if (favExpanded) {
        html += renderFolderTree(FAVORITES_FOLDER_ID, 0);
    }
    html += renderFolderTree(null, 0);
    list.innerHTML = html;
    list.querySelectorAll('.qpm-folder-item').forEach(item => {
        const folderId = item.dataset.folderId;
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.qpm-folder-actions') && !e.target.closest('.qpm-folder-toggle')) {
                currentFolderId = folderId;
                clearSelection();
                renderFolders();
                if (folderId === 'trash') {
                    renderTrash();
                } else {
                    renderPrompts();
                }
                updateTrashBadge();
                updateMassActionsBar();
            }
        });
    });
    list.querySelectorAll('.qpm-folder-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleExpand(toggle.dataset.toggle);
        });
    });
    list.querySelectorAll('[data-edit]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            editFolderName(btn.dataset.edit);
        });
    });
    list.querySelectorAll('[data-subfolder]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            createFolder(btn.dataset.subfolder);
        });
    });
    list.querySelectorAll('[data-delete]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteFolder(btn.dataset.delete);
        });
    });
}

// === МАССОВЫЕ ОПЕРАЦИИ ===
function clearSelection() {
    selectedPrompts.clear();
    lastSelectedPromptId = null;
    updateMassSelectAllCheckbox();
    updateMassActionsBar();
    if (currentFolderId === 'trash') {
        renderTrash();
    } else {
        renderPrompts(currentSearchQuery);
    }
}

function selectAllVisiblePrompts() {
    const visiblePrompts = getVisiblePrompts();
    selectedPrompts.clear();
    visiblePrompts.forEach(p => selectedPrompts.add(p.id));
    updateMassSelectAllCheckbox();
    updateMassActionsBar();
    if (currentFolderId === 'trash') {
        renderTrash();
    } else {
        renderPrompts(currentSearchQuery);
    }
}

function deselectAllPrompts() {
    selectedPrompts.clear();
    lastSelectedPromptId = null;
    updateMassSelectAllCheckbox();
    updateMassActionsBar();
    if (currentFolderId === 'trash') {
        renderTrash();
    } else {
        renderPrompts(currentSearchQuery);
    }
}

function toggleSelectAll() {
    const visiblePrompts = getVisiblePrompts();
    const allSelected = visiblePrompts.length > 0 && visiblePrompts.every(p => selectedPrompts.has(p.id));
    if (allSelected) {
        deselectAllPrompts();
    } else {
        selectAllVisiblePrompts();
    }
}

function updateMassSelectAllCheckbox() {
    if (!modalEl) return;
    const selectAllCheckbox = modalEl.querySelector('#qpm-mass-select-all-checkbox');
    if (!selectAllCheckbox) return;
    const visiblePrompts = getVisiblePrompts();
    const selectedCount = selectedPrompts.size;
    const totalCount = visiblePrompts.length;
    if (totalCount === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedCount === totalCount) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedCount > 0 && selectedCount < totalCount) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    }
}

function getVisiblePrompts() {
    let prompts;
    if (currentFolderId === 'trash') {
        prompts = getTrashPrompts();
    } else {
        prompts = data.prompts.filter(p => p.deleted !== true);
        if (currentFolderId !== 'all' && currentFolderId !== FAVORITES_FOLDER_ID) {
            const folderIds = [currentFolderId];
            function collectDescendants(fid) {
                const children = getChildrenFolders(fid);
                children.forEach(child => {
                    folderIds.push(child.id);
                    collectDescendants(child.id);
                });
            }
            collectDescendants(currentFolderId);
            prompts = prompts.filter(p => folderIds.includes(p.folderId));
        } else if (currentFolderId === FAVORITES_FOLDER_ID) {
            const folderIds = [FAVORITES_FOLDER_ID];
            function collectDescendants(fid) {
                const children = getChildrenFolders(fid);
                children.forEach(child => {
                    folderIds.push(child.id);
                    collectDescendants(child.id);
                });
            }
            collectDescendants(FAVORITES_FOLDER_ID);
            prompts = prompts.filter(p => folderIds.includes(p.folderId));
        }
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;
        switch(currentFilter) {
            case 'last7days':
                prompts = prompts.filter(p => now - p.createdAt <= 7 * dayMs);
                break;
            case 'last14days':
                prompts = prompts.filter(p => now - p.createdAt <= 14 * dayMs);
                break;
            case 'last30days':
                prompts = prompts.filter(p => now - p.createdAt <= 30 * dayMs);
                break;
        }
        if (currentSearchQuery?.trim()) {
            prompts = applySearchFilter(prompts, currentSearchQuery);
        }
    }
    return prompts;
}

function updateMassActionsBar() {
    if (!modalEl) return;
    const massBar = modalEl.querySelector('#qpm-mass-actions-bar');
    const selectCount = selectedPrompts.size;
    const massInfo = modalEl.querySelector('#qpm-mass-info');
    const isTrash = (currentFolderId === 'trash');
    if (selectCount > 0) {
        massBar.classList.remove('hidden');
        if (massInfo) massInfo.textContent = `${selectCount} ${t('selectedCount')}`;
    } else {
        massBar.classList.add('hidden');
        return;
    }
    const moveBtn = massBar.querySelector('#qpm-mass-move');
    const deleteBtn = massBar.querySelector('#qpm-mass-delete');
    const restoreBtn = massBar.querySelector('#qpm-mass-restore');
    const deletePermBtn = massBar.querySelector('#qpm-mass-delete-permanent');
    if (isTrash) {
        if (moveBtn) moveBtn.style.display = 'none';
        if (deleteBtn) deleteBtn.style.display = 'none';
        if (restoreBtn) restoreBtn.style.display = 'inline-flex';
        if (deletePermBtn) deletePermBtn.style.display = 'inline-flex';
    } else {
        if (moveBtn) moveBtn.style.display = 'inline-flex';
        if (deleteBtn) deleteBtn.style.display = 'inline-flex';
        if (restoreBtn) restoreBtn.style.display = 'none';
        if (deletePermBtn) deletePermBtn.style.display = 'none';
    }
}

function massDeleteSelected() {
    const count = selectedPrompts.size;
    if (count === 0) return;
    if (confirm(t('confirmMassDelete').replace('{count}', count))) {
        const deletedPromptIds = Array.from(selectedPrompts);
        selectedPrompts.forEach(promptId => {
            const prompt = data.prompts.find(p => p.id === promptId);
            if (prompt && !prompt.deleted) {
                prompt.deleted = true;
                prompt.deletedAt = Date.now();
            }
        });
        saveData();
        addToUndo('massDelete', { promptIds: deletedPromptIds });
        clearSelection();
        if (currentFolderId === 'trash') {
            renderTrash();
        } else {
            renderPrompts(currentSearchQuery);
        }
        renderFolders();
        updateTrashBadge();
        showToast(t('promptsMovedToTrash').replace('${count}', count));
    }
}

function massRestoreSelected() {
    const count = selectedPrompts.size;
    if (count === 0) return;
    if (confirm(t('confirmMassRestore').replace('{count}', count))) {
        const restoredPromptIds = [];
        const deletedAt = Date.now();
        selectedPrompts.forEach(promptId => {
            const prompt = data.prompts.find(p => p.id === promptId);
            if (prompt && prompt.deleted) {
                restoredPromptIds.push(promptId);
                prompt.deleted = false;
                prompt.deletedAt = null;
            }
        });
        saveData();
        addToUndo('massRestore', { promptIds: restoredPromptIds, deletedAt: deletedAt });
        clearSelection();
        renderTrash();
        renderFolders();
        updateTrashBadge();
        showToast(t('promptsRestored').replace('${count}', count));
    }
}

function massDeletePermanentlySelected() {
    const count = selectedPrompts.size;
    if (count === 0) return;
    if (confirm(t('confirmMassDeletePermanent').replace('{count}', count))) {
        data.prompts = data.prompts.filter(p => !selectedPrompts.has(p.id));
        clearSelection();
        renderTrash();
        renderFolders();
        updateTrashBadge();
        showToast(`💀 ${count} ` + t('foldersDeleted'));
    }
}

function massMoveSelected() {
    const count = selectedPrompts.size;
    if (count === 0) return;
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay';
    overlay.id = 'qpm-mass-move-overlay';
    let opts = '<option value="">📂 ' + t('allPrompts') + '</option>';
    opts += `<option value="${FAVORITES_FOLDER_ID}">⭐ ${t('favorites')}</option>`;

    // ИСПРАВЛЕННАЯ ФУНКЦИЯ ДЛЯ ПОДПАПОК
    function buildAllFolderOptions(parentId, level = 0) {
    const children = getChildrenFolders(parentId);
    children.forEach(f => {
        const indent = ' '.repeat(level * 2);
        const icon = (f.parentId === FAVORITES_FOLDER_ID) ? '⭐' : '📁';
        opts += `<option value="${f.id}">${indent}${icon} ${escapeHtml(f.name)}</option>`;
        buildAllFolderOptions(f.id, level + 1);
    });
}
// Добавляем подпапки из Избранного
const favChildren = getChildrenFolders(FAVORITES_FOLDER_ID);
favChildren.forEach(f => {
    const indent = '  ';
    opts += `<option value="${f.id}">${indent}⭐ ${escapeHtml(f.name)} (в избранном)</option>`;
    buildAllFolderOptions(f.id, 2);
});
buildAllFolderOptions(null);

    overlay.innerHTML = `
        <div class="qpm-preview" style="width: 400px; max-height: none;">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">📁 ${t('massMove')} (${count})</div>
                <div class="qpm-preview-close" id="qpm-mass-move-close">&times;</div>
            </div>
            <div style="padding: 20px;">
                <div style="margin-bottom: 10px; font-size: 13px; color: #888;">
                    ${t('selectedCount')}: <strong style="color: #fff;">${count}</strong>
                </div>
                <select id="qpm-mass-move-folder-select" style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #444; color: white; border-radius: 6px; font-size: 14px;">
                    ${opts}
                </select>
            </div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-mass-move-cancel">${t('cancel')}</button>
                <button class="qpm-preview-btn qpm-preview-btn-copy" id="qpm-mass-move-confirm" style="background: linear-gradient(145deg, #2a5a6a, #1a4a5a);">📁 ${t('moveToFolder')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('#qpm-mass-move-close').addEventListener('click', close);
    overlay.querySelector('#qpm-mass-move-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#qpm-mass-move-confirm').addEventListener('click', () => {
        const targetFolderId = overlay.querySelector('#qpm-mass-move-folder-select').value || null;
        const moveItems = [];
        selectedPrompts.forEach(promptId => {
            const prompt = data.prompts.find(p => p.id === promptId);
            if (prompt && !prompt.deleted) {
                moveItems.push({
                    promptId: promptId,
                    oldFolderId: prompt.folderId
                });
                prompt.folderId = targetFolderId;
            }
        });
        saveData();
        addToUndo('massMove', { items: moveItems });
        clearSelection();
        renderPrompts(currentSearchQuery);
        renderFolders();
        showToast(t('promptsMoved').replace('${count}', count));
        close();
    });
    overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    overlay.style.display = 'flex';
}

function handlePromptSelection(promptId, event, isSelected) {
    if (event.shiftKey && lastSelectedPromptId && lastSelectedPromptId !== promptId) {
        const visiblePrompts = getVisiblePrompts();
        const lastIndex = visiblePrompts.findIndex(p => p.id === lastSelectedPromptId);
        const currentIndex = visiblePrompts.findIndex(p => p.id === promptId);
        if (lastIndex !== -1 && currentIndex !== -1) {
            const start = Math.min(lastIndex, currentIndex);
            const end = Math.max(lastIndex, currentIndex);
            for (let i = start; i <= end; i++) {
                selectedPrompts.add(visiblePrompts[i].id);
            }
        }
    } else {
        if (isSelected) {
            selectedPrompts.add(promptId);
        } else {
            selectedPrompts.delete(promptId);
        }
    }
    lastSelectedPromptId = promptId;
    updateMassSelectAllCheckbox();
    updateMassActionsBar();
    if (currentFolderId === 'trash') {
        renderTrash();
    } else {
        renderPrompts(currentSearchQuery);
    }
}

function renderTrash() {
    if (!modalEl) return;
    const list = modalEl.querySelector('#qpm-prompt-list');
    if (!list) return;
    const trashPrompts = getTrashPrompts();
    const now = Date.now();
    if (trashPrompts.length === 0) {
        list.innerHTML = `<div class="qpm-empty-state"><div class="qpm-empty-state-icon">🗑️</div><div>${t('trashEmpty')}</div></div>`;
        return;
    }
    list.innerHTML = '';
    trashPrompts.forEach(prompt => {
        const daysAgo = Math.floor((now - prompt.deletedAt) / (24 * 60 * 60 * 1000));
        const folder = data.folders.find(f => f.id === prompt.folderId);
        const folderName = folder?.name || t('allPrompts');
        const isSelected = selectedPrompts.has(prompt.id);
        const item = document.createElement('div');
        item.className = `qpm-prompt-item trashed ${isSelected ? 'selected' : ''}`;
        item.innerHTML = `
            <div class="qpm-prompt-checkbox">
                <input type="checkbox" class="qpm-prompt-select" data-id="${prompt.id}" ${isSelected ? 'checked' : ''}>
            </div>
            <div class="qpm-prompt-content">
                <div class="qpm-prompt-name">
                    <span class="qpm-prompt-name-icon">🗑️</span>
                    <span>${escapeHtml(prompt.name)}</span>
                </div>
                <div class="qpm-prompt-text">${escapeHtml(prompt.text)}</div>
                <div class="qpm-prompt-footer">
                    <div>
                        <span class="qpm-prompt-date">${daysAgo} ${t('daysAgo')}</span>
                        <span style="color:#666;margin:0 8px">•</span>
                        <span style="font-size:12px;color:#888">${escapeHtml(folderName)}</span>
                    </div>
                    <div class="qpm-prompt-actions">
                        <button class="restore" title="${t('restore')}"><span class="btn-icon">↩️</span></button>
                        <button class="delete-permanent" title="${t('deletePermanent')}"><span class="btn-icon">💀</span></button>
                    </div>
                </div>
            </div>`;
        const checkbox = item.querySelector('.qpm-prompt-select');
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            handlePromptSelection(prompt.id, e, checkbox.checked);
        });
        item.querySelector('.restore').addEventListener('click', (e) => {
            e.stopPropagation();
            restoreFromTrash(prompt.id);
        });
        item.querySelector('.delete-permanent').addEventListener('click', (e) => {
            e.stopPropagation();
            deletePermanently(prompt.id);
        });
        list.appendChild(item);
    });
}

function movePromptToFolder(promptId, targetFolderId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (prompt) {
        prompt.folderId = targetFolderId || null;
        saveData();
        showToast(t('promptMoved'));
        renderPrompts(currentSearchQuery);
        renderFolders();
    }
}

function showMoveDialog(promptId) {
    const prompt = data.prompts.find(p => p.id === promptId);
    if (!prompt) return;
    const overlay = document.createElement('div');
    overlay.className = 'qpm-preview-overlay';
    overlay.id = 'qpm-move-overlay';
    let opts = '<option value="">📂 ' + t('allPrompts') + '</option>';
    opts += `<option value="${FAVORITES_FOLDER_ID}" ${prompt.folderId === FAVORITES_FOLDER_ID ? 'selected' : ''}>⭐ ${t('favorites')}</option>`;

    // ИСПРАВЛЕННАЯ ФУНКЦИЯ ДЛЯ ПОДПАПОК
    function buildMoveFolderOptions(parentId, level = 0) {
    const children = getChildrenFolders(parentId);
    children.forEach(f => {
        const indent = ' '.repeat(level * 2);
        const selected = prompt.folderId === f.id ? 'selected' : '';
        const icon = (f.parentId === FAVORITES_FOLDER_ID) ? '⭐' : '📁';
        opts += `<option value="${f.id}" ${selected}>${indent}${icon} ${escapeHtml(f.name)}</option>`;
        buildMoveFolderOptions(f.id, level + 1);
    });
}
// Добавляем подпапки из Избранного
const favChildren = getChildrenFolders(FAVORITES_FOLDER_ID);
favChildren.forEach(f => {
    const indent = '  ';
    const selected = prompt.folderId === f.id ? 'selected' : '';
    opts += `<option value="${f.id}" ${selected}>${indent}⭐ ${escapeHtml(f.name)} (в избранном)</option>`;
    buildMoveFolderOptions(f.id, 2);
});
buildMoveFolderOptions(null);

    overlay.innerHTML = `
        <div class="qpm-preview" style="width: 400px; max-height: none;">
            <div class="qpm-preview-header">
                <div class="qpm-preview-title">📁 ${t('movePrompt')}</div>
                <div class="qpm-preview-close" id="qpm-move-close">&times;</div>
            </div>
            <div style="padding: 20px;">
                <div style="margin-bottom: 10px; font-size: 13px; color: #888;">
                    ${t('promptName')}: <strong style="color: #fff;">${escapeHtml(prompt.name)}</strong>
                </div>
                <select id="qpm-move-folder-select" style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #444; color: white; border-radius: 6px; font-size: 14px;">
                    ${opts}
                </select>
            </div>
            <div class="qpm-preview-footer">
                <button class="qpm-preview-btn qpm-preview-btn-close" id="qpm-move-cancel">${t('cancel')}</button>
                <button class="qpm-preview-btn qpm-preview-btn-copy" id="qpm-move-confirm" style="background: linear-gradient(145deg, #2a5a6a, #1a4a5a);">📁 ${t('moveToFolder')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('#qpm-move-close').addEventListener('click', close);
    overlay.querySelector('#qpm-move-cancel').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('#qpm-move-confirm').addEventListener('click', () => {
        const targetFolderId = overlay.querySelector('#qpm-move-folder-select').value || null;
        movePromptToFolder(promptId, targetFolderId);
        close();
    });
    overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    overlay.style.display = 'flex';
    setTimeout(() => overlay.querySelector('#qpm-move-folder-select').focus(), 50);
}

// === РЕНДЕР ПРОМПТОВ ===
function renderPrompts(searchQuery = '') {
    if (!modalEl) return;
    const list = modalEl.querySelector('#qpm-prompt-list');
    if (!list) return;
    if (currentFolderId === 'trash') {
        renderTrash();
        return;
    }
    let prompts = data.prompts.filter(p => p.deleted !== true);
    if (currentFolderId !== 'all' && currentFolderId !== FAVORITES_FOLDER_ID) {
        const folderIds = [currentFolderId];
        function collectDescendants(fid) {
            const children = getChildrenFolders(fid);
            children.forEach(child => {
                folderIds.push(child.id);
                collectDescendants(child.id);
            });
        }
        collectDescendants(currentFolderId);
        prompts = prompts.filter(p => folderIds.includes(p.folderId));
    } else if (currentFolderId === FAVORITES_FOLDER_ID) {
        const folderIds = [FAVORITES_FOLDER_ID];
        function collectDescendants(fid) {
            const children = getChildrenFolders(fid);
            children.forEach(child => {
                folderIds.push(child.id);
                collectDescendants(child.id);
            });
        }
        collectDescendants(FAVORITES_FOLDER_ID);
        prompts = prompts.filter(p => folderIds.includes(p.folderId));
    }
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    switch(currentFilter) {
        case 'last7days':
            prompts = prompts.filter(p => now - p.createdAt <= 7 * dayMs);
            break;
        case 'last14days':
            prompts = prompts.filter(p => now - p.createdAt <= 14 * dayMs);
            break;
        case 'last30days':
            prompts = prompts.filter(p => now - p.createdAt <= 30 * dayMs);
            break;
    }
    prompts = applySearchFilter(prompts, searchQuery);
    switch(currentFilter) {
        case 'dateAsc':
            prompts.sort((a, b) => (a.order || a.createdAt) - (b.order || b.createdAt));
            break;
        default:
            prompts.sort((a, b) => {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
                return (b.order || b.createdAt) - (a.order || a.createdAt);
            });
            break;
    }
    if (prompts.length === 0) {
        list.innerHTML = `<div class="qpm-empty-state"><div class="qpm-empty-state-icon">📝</div><div>${t('noPrompts')}</div><div style="font-size:13px;margin-top:10px;color:#888;">${searchQuery ? t('notFound') : t('createNew')}</div></div>`;
        return;
    }
    list.innerHTML = '';
    prompts.forEach(prompt => {
        const folder = data.folders.find(f => f.id === prompt.folderId);
        const folderName = folder?.name || t('allPrompts');
        const date = new Date(prompt.createdAt).toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : currentLang === 'fr' ? 'fr-FR' : 'en-US');
        const displayName = prompt.name?.trim() || '📄 ' + t('noFolder');
        const displayText = prompt.text || '(empty)';
        const isSelected = selectedPrompts.has(prompt.id);
        const isFav = prompt.folderId === FAVORITES_FOLDER_ID;
        const hasVars = hasVariables(prompt.text);
        const item = document.createElement('div');
        item.className = `qpm-prompt-item ${prompt.pinned ? 'pinned' : ''} ${isFav ? 'favorited' : ''} ${isSelected ? 'selected' : ''}`;
        item.dataset.promptId = prompt.id;
        item.setAttribute('draggable', 'true');
        item.addEventListener('dragstart', (e) => handleDragStart(e, prompt.id));
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        let hName = escapeHtml(displayName), hText = escapeHtml(displayText);
        if (searchQuery?.trim()) {
            const regex = new RegExp(`(${escapeRegex(searchQuery)})`, 'gi');
            hName = hName.replace(regex, '<span class="qpm-highlight">$1</span>');
            hText = hText.replace(regex, '<span class="qpm-highlight">$1</span>');
        }
        item.innerHTML = `
            <div class="qpm-prompt-checkbox">
                <input type="checkbox" class="qpm-prompt-select" data-id="${prompt.id}" ${isSelected ? 'checked' : ''}>
            </div>
            <div class="qpm-prompt-content">
                <div class="qpm-prompt-name">
                    <span class="qpm-prompt-name-icon">${prompt.name?.trim() ? '📋' : '📄'}</span>
                    <span>${hName}</span>
                    <span class="qpm-prompt-pin-indicator">📌</span>
                    ${isFav ? '<span style="color:#ffd700; font-size:12px;">⭐</span>' : ''}
                    ${hasVars ? '<span class="qpm-template-badge" title="' + t('variableHint') + '">📋 ' + t('templateBadge') + '</span>' : ''}
                    ${(prompt.history && prompt.history.length > 0) ? `<span class="qpm-history-badge" title="${t('versionHistoryBadge').replace('${count}', prompt.history.length)}">📜 ${prompt.history.length}</span>` : ''}
                </div>
                <div class="qpm-prompt-text">${hText}</div>
                <div class="qpm-tags-container" id="qpm-tags-${prompt.id}">
                    ${(prompt.tags || []).map(tag => `<span class="qpm-tag" data-tag="${escapeHtml(tag)}">#${escapeHtml(tag)}</span>`).join('')}
                </div>
                <div class="qpm-prompt-footer">
                    <div>
                        <span class="qpm-prompt-date">${date}</span>
                        <span style="color:#666;margin:0 8px">•</span>
                        <span style="font-size:12px;color:#888">${escapeHtml(folderName)}</span>
                    </div>
                    <div class="qpm-prompt-actions">
                        <button class="copy" title="${t('copy')}"><span class="btn-icon">📋</span></button>
                        <button class="duplicate" title="${t('createCopy')}"><span class="btn-icon">📑</span></button>
                        <button class="preview" title="${t('preview')}"><span class="btn-icon">👁️</span></button>
                        <button class="edit" title="${t('edit')}"><span class="btn-icon">✏️</span></button>
                        <button class="move" title="${t('move')}"><span class="btn-icon">📁</span></button>
                        <button class="pin ${prompt.pinned ? 'pinned' : ''}" title="${prompt.pinned ? t('unpin') : t('pin')}"><span class="btn-icon">${prompt.pinned ? '⚓' : '📌'}</span></button>
                        <button class="favorite ${isFav ? 'active' : ''}" title="${isFav ? t('unfavorite') : t('favorite')}"><span class="btn-icon">⭐</span></button>
                        <button class="tags" title="${t('manageTags') || t('tags')}"><span class="btn-icon">🏷️</span></button>
                        <button class="history" title="${t('versionHistory')}"><span class="btn-icon">📜</span></button>
                        <button class="delete" title="${t('delete')}"><span class="btn-icon">🗑️</span></button>
                    </div>
                    <span class="qpm-drag-handle" title="${t('drag')}"><span class="drag-icon">✋</span></span>
                </div>
            </div>`;
        const checkbox = item.querySelector('.qpm-prompt-select');
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            handlePromptSelection(prompt.id, e, checkbox.checked);
        });
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.qpm-prompt-actions') &&
                !e.target.closest('.qpm-drag-handle') &&
                e.target !== checkbox &&
                !checkbox.contains(e.target)) {
                const statsBar = document.getElementById('qpm-stats-bar');
                if (statsBar) {
                    const finalText = prompt.text;
                    const chars = countCharacters(finalText);
                    const tokens = estimateTokens(finalText);
                    const limit = getContextLimit();
                    updateStatsDisplay(statsBar, chars, tokens, limit);
                }
                insertPromptWithVariables(prompt);
            }
        });
        item.querySelector('.copy').addEventListener('click', async (e) => {
            e.stopPropagation();
            const ok = await copyToClipboard(prompt.text);
            showToast(ok ? t('copied') : t('error'), !ok);
        });
        item.querySelector('.duplicate').addEventListener('click', (e) => {
            e.stopPropagation();
            const newPrompt = {
                id: 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                name: prompt.name + ' (' + t('createCopy').toLowerCase() + ')',
                text: prompt.text,
                folderId: prompt.folderId,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                pinned: false,
                order: Date.now(),
                deleted: false,
                deletedAt: null,
                tags: prompt.tags ? [...prompt.tags] : [],
                history: []
            };
            data.prompts.push(newPrompt);
            saveData();
            showToast(t('duplicatePrompt').replace('${name}', newPrompt.name));
            renderPrompts(currentSearchQuery);
            renderFolders();
        });
        item.querySelector('.preview').addEventListener('click', (e) => { e.stopPropagation(); openPreview(prompt); });
        item.addEventListener('mouseenter', () => {
            const statsBar = document.getElementById('qpm-stats-bar');
            if (statsBar) {
                const chars = countCharacters(prompt.text);
                const tokens = estimateTokens(prompt.text);
                const limit = getContextLimit();
                updateStatsDisplay(statsBar, chars, tokens, limit);
            }
        });
        item.querySelector('.edit').addEventListener('click', (e) => {
            e.stopPropagation();
            openEditor(prompt.id);
        });
        item.querySelector('.move').addEventListener('click', (e) => {
            e.stopPropagation();
            showMoveDialog(prompt.id);
        });
        item.querySelector('.pin').addEventListener('click', (e) => {
            e.stopPropagation();
            prompt.pinned = !prompt.pinned;
            prompt.order = prompt.pinned ? Date.now() : prompt.createdAt;
            saveData(); renderPrompts(currentSearchQuery); renderFolders();
        });
        item.querySelector('.favorite').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(prompt.id);
        });
        item.querySelector('.tags').addEventListener('click', (e) => {
            e.stopPropagation();
            showAddTagDialog(prompt.id);
        });
        item.querySelector('.history').addEventListener('click', (e) => {
            e.stopPropagation();
            showVersionHistory(prompt.id);
        });
        item.querySelector('.delete').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(t('deletePromptConfirm'))) {
                moveToTrash(prompt.id);
            }
        });
        list.appendChild(item);
    });
}

function openEditor(promptId = null) {
    try {
        const prompt = promptId ? data.prompts.find(p => p.id === promptId) : null;
        const old = document.getElementById('qpm-editor-overlay'); if (old) old.remove();
        const overlay = document.createElement('div');
        overlay.className = 'qpm-editor-overlay'; overlay.id = 'qpm-editor-overlay';

        // Получаем текущие теги
        const currentTags = prompt?.tags || [];

        // Строим HTML для тегов
        let tagsHtml = '';
        if (currentTags.length > 0) {
            tagsHtml = currentTags.map(tag => `
                <span class="qpm-editor-tag" data-tag="${escapeHtml(tag)}" style="display: inline-flex; align-items: center; gap: 4px; background: rgba(16,163,127,0.2); border: 1px solid rgba(16,163,127,0.3); color: #10a37f; font-size: 11px; padding: 4px 10px; border-radius: 16px; margin-right: 6px; margin-bottom: 6px;">
                    #${escapeHtml(tag)}
                    <span class="qpm-editor-tag-remove" data-tag="${escapeHtml(tag)}" style="cursor: pointer; color: #ff8888; margin-left: 4px;">✖️</span>
                </span>
            `).join('');
        } else {
            tagsHtml = '<span style="color:#666; font-size:12px;">' + t('noTags') + '</span>';
        }

        // ИСПРАВЛЕННАЯ ФУНКЦИЯ ДЛЯ ПОДПАПОК
        function buildEditorFolderOptions(parentId, level = 0) {
            const children = getChildrenFolders(parentId);
            let opts = '';
            children.forEach(f => {
                const indent = ' '.repeat(level * 2);
                const selected = prompt?.folderId === f.id ? 'selected' : '';
                const icon = (f.parentId === FAVORITES_FOLDER_ID) ? '⭐' : '📁';
                opts += `<option value="${f.id}" ${selected}>${indent}${icon} ${escapeHtml(f.name)}</option>`;
                opts += buildEditorFolderOptions(f.id, level + 1);
            });
            return opts;
        }
        let folderOpts = `<option value="">${t('allPrompts')}</option>`;
        folderOpts += `<option value="${FAVORITES_FOLDER_ID}" ${prompt?.folderId === FAVORITES_FOLDER_ID ? 'selected' : ''}>⭐ ${t('favorites')}</option>`;
        // Добавляем подпапки из Избранного
        const favChildren = getChildrenFolders(FAVORITES_FOLDER_ID);
        favChildren.forEach(f => {
            const indent = '  ';
            const selected = prompt?.folderId === f.id ? 'selected' : '';
            folderOpts += `<option value="${f.id}" ${selected}>${indent}⭐ ${escapeHtml(f.name)} (в избранном)</option>`;
            folderOpts += buildEditorFolderOptions(f.id, 2);
        });
        folderOpts += buildEditorFolderOptions(null);

        overlay.innerHTML = `
            <div class="qpm-editor" style="width: 650px; max-height: 85vh; display: flex; flex-direction: column;">
                <div class="qpm-editor-title" style="flex-shrink: 0;">
                    ${promptId ? t('edit') : t('newPrompt')}
                    <span style="font-size: 11px; color: #888; margin-left: 10px;">
    ⌨️ Ctrl+Enter 💾 | Shift+S 💾 | Esc ✖️
</span>
                    <div class="qpm-editor-close" style="float: right; cursor: pointer; font-size: 24px; color: #aaa;" onclick="document.getElementById('qpm-editor-overlay')?.remove()">&times;</div>
                </div>
                <div style="flex: 1; overflow-y: auto; padding-right: 5px;">
                    <div class="qpm-editor-field">
                        <label>${t('promptName')} *</label>
                        <input type="text" class="qpm-editor-name-input" id="qpm-editor-name" placeholder="${t('promptName')}" value="${escapeHtml(prompt?.name || '')}">
                    </div>
                    <div class="qpm-editor-field">
                        <label>${t('folder')} (${t('optional')})</label>
                        <div class="qpm-editor-folder-select"><select id="qpm-editor-folder">${folderOpts}</select></div>
                    </div>

                    <!-- СЕКЦИЯ ТЕГОВ -->
                    <div class="qpm-editor-field">
                        <label>🏷️ ${t('tags')} <span style="color:#888; font-size:11px;">(через пробел или запятую)</span></label>
                        <div style="margin-bottom: 8px;">
                            <div id="qpm-editor-tags-container" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; padding: 8px; background: #1a1a1a; border-radius: 6px; min-height: 40px; max-height: 100px; overflow-y: auto;">
                                ${tagsHtml}
                            </div>
                            <div style="display: flex; gap: 8px;">
                                <input type="text" id="qpm-editor-new-tag" placeholder="${t('addTag')} (например: важный срочный работа)" style="flex: 1; padding: 8px; background: #2a2b2e; border: 1px solid #555; color: white; border-radius: 4px; font-size: 13px;">
                                <button id="qpm-editor-add-tag" style="background: #10a37f; border: none; color: white; padding: 8px 15px; border-radius: 4px; cursor: pointer;">➕ ${t('addTag')}</button>
                            </div>
                            <div style="font-size: 10px; color: #666; margin-top: 6px;">
                                💡 Можно добавлять несколько тегов через пробел. Теги будут видны в списке промптов.
                            </div>
                        </div>
                    </div>

                    <div class="qpm-editor-field">
                        <label>${t('promptText')} *</label>
                        <textarea class="qpm-editor-textarea" id="qpm-editor-text" placeholder="${t('promptText')}...\n\n💡 ${t('variableHint')}" style="min-height: 150px;">${escapeHtml(prompt?.text || '')}</textarea>
                    </div>
                </div>
                <div class="qpm-editor-buttons" style="flex-shrink: 0; margin-top: 15px;">
                    <button class="qpm-editor-btn qpm-editor-btn-cancel" id="qpm-editor-cancel">${t('cancel')}</button>
                    <button class="qpm-editor-btn qpm-editor-btn-save" id="qpm-editor-save">${t('save')}</button>
                </div>
            </div>`;
        document.body.appendChild(overlay);
        overlay.style.display = 'flex';

        // Добавляем обработчик для крестика
        const closeBtn = overlay.querySelector('.qpm-editor-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeEditor);
        }

        // Массив текущих тегов
        let editorTags = [...currentTags];

        // Функция обновления отображения тегов в редакторе
        function updateEditorTagsDisplay() {
            const container = overlay.querySelector('#qpm-editor-tags-container');
            if (editorTags.length === 0) {
                container.innerHTML = '<span style="color:#666; font-size:12px;">' + t('noTags') + '</span>';
            } else {
                container.innerHTML = editorTags.map(tag => `
                    <span class="qpm-editor-tag" data-tag="${escapeHtml(tag)}" style="display: inline-flex; align-items: center; gap: 4px; background: rgba(16,163,127,0.2); border: 1px solid rgba(16,163,127,0.3); color: #10a37f; font-size: 11px; padding: 4px 10px; border-radius: 16px; margin-right: 6px; margin-bottom: 6px;">
                        #${escapeHtml(tag)}
                        <span class="qpm-editor-tag-remove" data-tag="${escapeHtml(tag)}" style="cursor: pointer; color: #ff8888; margin-left: 4px;">✖️</span>
                    </span>
                `).join('');
                // Добавляем обработчики удаления
                container.querySelectorAll('.qpm-editor-tag-remove').forEach(removeBtn => {
                    removeBtn.addEventListener('click', () => {
                        const tagToRemove = removeBtn.dataset.tag;
                        editorTags = editorTags.filter(t => t !== tagToRemove);
                        updateEditorTagsDisplay();
                    });
                });
            }
        }

        // Функция добавления тегов из строки
        function addTagsFromInput(tagString) {
            // Разделяем по пробелам и запятым
            const newTags = tagString.split(/[\s,]+/).map(t => t.trim()).filter(t => t && !editorTags.includes(t));
            newTags.forEach(tag => {
                if (/^[\w\u0400-\u04FF\-]+$/.test(tag)) {
                    editorTags.push(tag);
                } else {
                    showToast(`Тег "${tag}" содержит недопустимые символы`, true);
                }
            });
            updateEditorTagsDisplay();
        }

        // Обработчик добавления тега
        overlay.querySelector('#qpm-editor-add-tag').addEventListener('click', () => {
            const newTagInput = overlay.querySelector('#qpm-editor-new-tag');
            const tagValue = newTagInput.value.trim();
            if (tagValue) {
                addTagsFromInput(tagValue);
                newTagInput.value = '';
            }
        });

        // Добавляем Enter для поля ввода тега
        overlay.querySelector('#qpm-editor-new-tag').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                overlay.querySelector('#qpm-editor-add-tag').click();
            }
        });

        updateEditorTagsDisplay();

        setTimeout(() => { const n = overlay.querySelector('#qpm-editor-name'); if (n) { n.focus(); n.select(); } }, 50);
        overlay.querySelector('#qpm-editor-cancel').addEventListener('click', closeEditor);
        overlay.querySelector('#qpm-editor-save').addEventListener('click', () => {
            const name = overlay.querySelector('#qpm-editor-name').value.trim();
            const text = overlay.querySelector('#qpm-editor-text').value;
            const folderId = overlay.querySelector('#qpm-editor-folder').value || null;
            if (!name) { alert(t('promptName')); return; }
            if (!text) { alert(t('promptText')); return; }
            if (promptId) {
                const p = data.prompts.find(p => p.id === promptId);
                if (p) {
                    if (p.name !== name || p.text !== text || p.folderId !== folderId) {
                        savePromptVersion(p);
                    }
                    p.name = name;
                    p.text = text;
                    p.folderId = folderId;
                    p.updatedAt = Date.now();
                    // Сохраняем теги
                    if (editorTags.length > 0) {
                        p.tags = editorTags;
                    } else {
                        delete p.tags;
                    }
                }
            } else {
                const newPrompt = {
                    id: 'p_' + Date.now(),
                    name,
                    text,
                    folderId,
                    createdAt: Date.now(),
                    pinned: false,
                    order: Date.now(),
                    deleted: false,
                    deletedAt: null,
                    tags: editorTags.length > 0 ? editorTags : undefined,
                    history: []
                };
                data.prompts.push(newPrompt);
            }
            saveData(); closeEditor(); renderFolders(); renderPrompts(modalEl?.querySelector('#qpm-search')?.value || '');
        });
        overlay.querySelector('#qpm-editor-name').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); overlay.querySelector('#qpm-editor-text').focus(); } });
        overlay.addEventListener('keypress', (e) => {
            const target = e.target;
            const isTextarea = target && target.id === 'qpm-editor-text';
            if (e.key === 'Enter' && isTextarea) {
                e.preventDefault();
                e.stopPropagation();
                const cursorPos = target.selectionStart;
                const textBefore = target.value.substring(0, cursorPos);
                const textAfter = target.value.substring(target.selectionEnd);
                target.value = textBefore + '\n' + textAfter;
                target.selectionStart = target.selectionEnd = cursorPos + 1;
                target.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
        overlay.addEventListener('keydown', (e) => {
            const target = e.target;
            const isTextarea = target && target.id === 'qpm-editor-text';
            const isNameInput = target && target.id === 'qpm-editor-name';
            const isTagInput = target && target.id === 'qpm-editor-new-tag';
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                closeEditor();
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                const saveBtn = overlay.querySelector('#qpm-editor-save');
                if (saveBtn) saveBtn.click();
            } else if (e.key === 'Enter' && !isTextarea && !isTagInput) {
                e.preventDefault();
                e.stopPropagation();
                if (isNameInput) {
                    const textarea = overlay.querySelector('#qpm-editor-text');
                    if (textarea) textarea.focus();
                }
            }
        });
    } catch (e) { console.error('QPM: Editor error', e); alert(t('error')); }
}

function closeEditor() { const o = document.getElementById('qpm-editor-overlay'); if (o) o.remove(); }

// === DRAG & DROP ===
function handleDragStart(e, promptId) {
    draggedPromptId = promptId;
    const item = e.target.closest('.qpm-prompt-item');
    const handle = item.querySelector('.qpm-drag-handle');
    item.classList.add('dragging');
    if (handle) handle.classList.add('grabbing');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', promptId);
    setTimeout(() => { item.style.opacity = '0.4'; }, 0);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const item = e.target.closest('.qpm-prompt-item');
    if (item && !item.classList.contains('dragging')) {
        item.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const item = e.target.closest('.qpm-prompt-item');
    if (item) item.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const targetItem = e.target.closest('.qpm-prompt-item');
    if (!targetItem || !draggedPromptId) return;
    const targetId = targetItem.dataset.promptId;
    if (targetId && targetId !== draggedPromptId) {
        const allPrompts = data.prompts;
        const fromIndex = allPrompts.findIndex(p => p.id === draggedPromptId);
        const toIndex = allPrompts.findIndex(p => p.id === targetId);
        if (fromIndex >= 0 && toIndex >= 0) {
            const [moved] = allPrompts.splice(fromIndex, 1);
            allPrompts.splice(toIndex, 0, moved);
            allPrompts.forEach((p, i) => { if (!p.pinned) p.order = Date.now() - i; });
            saveData(); renderPrompts(currentSearchQuery); renderFolders();
        }
    }
    document.querySelectorAll('.qpm-prompt-item').forEach(item => {
        item.classList.remove('dragging', 'drag-over');
        const handle = item.querySelector('.qpm-drag-handle');
        if (handle) handle.classList.remove('grabbing');
    });
    draggedPromptId = null;
}

function handleDragEnd(e) {
    const item = e.target.closest('.qpm-prompt-item');
    if (item) {
        item.classList.remove('dragging'); item.style.opacity = '1';
        const handle = item.querySelector('.qpm-drag-handle');
        if (handle) handle.classList.remove('grabbing');
    }
    document.querySelectorAll('.qpm-prompt-item').forEach(it => { it.classList.remove('drag-over'); });
    draggedPromptId = null;
}

// === СОХРАНЕНИЕ И СИНХРОНИЗАЦИЯ ===
function saveData(showIndicator = true) {
    let gmSuccess = false;
    let localSuccess = false;
    try {
        if (typeof GM_setValue !== 'undefined') {
            GM_setValue(STORAGE_KEY, data);
            GM_setValue(STORAGE_KEY_EXPANDED, expandedFolders);
            gmSuccess = true;
        }
    } catch (e) { console.error('QPM: GM_setValue error', e); }
    try {
        if (testLocalStorage()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            localStorage.setItem(STORAGE_KEY_EXPANDED, JSON.stringify(expandedFolders));
            localStorage.setItem(STORAGE_KEY + '_timestamp', Date.now().toString());
            localSuccess = true;
        }
    } catch (e) { console.error('QPM: localStorage error', e); }
    const success = gmSuccess || localSuccess;
    if (showIndicator) {
        if (success) {
            showSaveIndicator(`${t('dataSaved')} <small>[${gmSuccess ? t('gmStorage') : (localSuccess ? t('localStorage') : '?')}]</small>`);
        } else {
            showSaveIndicator(t('storageError'), true);
        }
    }
    if (localSuccess) {
        localStorage.setItem(STORAGE_KEY + '_trigger', Date.now().toString());
    }
    return success;
}

function syncFromExternalStorage(forceUpdate = false) {
    if (isSyncing) return;
    isSyncing = true;
    try {
        let externalData = null;
        let externalExpanded = null;
        if (typeof GM_getValue !== 'undefined') {
            externalData = GM_getValue(STORAGE_KEY, null);
            externalExpanded = GM_getValue(STORAGE_KEY_EXPANDED, null);
        }
        if (!externalData) {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) externalData = JSON.parse(stored);
            const storedExpanded = localStorage.getItem(STORAGE_KEY + '_expanded');
            if (storedExpanded) externalExpanded = JSON.parse(storedExpanded);
        }
        if (externalData && externalData.prompts && externalData.folders) {
            const currentHash = JSON.stringify(data);
            const externalHash = JSON.stringify(externalData);
            if (forceUpdate || currentHash !== externalHash) {
                data = externalData;
                if (externalExpanded) expandedFolders = externalExpanded;
                initFavoritesFolder();
                if (modalOpen && modalEl) {
                    const searchValue = modalEl.querySelector('#qpm-search')?.value || '';
                    renderFolders();
                    if (currentFolderId === 'trash') {
                        renderTrash();
                    } else {
                        renderPrompts(searchValue);
                    }
                    updateTrashBadge();
                    updateMassActionsBar();
                    if (!forceUpdate) showToast('🔄 ' + t('syncSuccess'), false);
                }
            }
        }
    } catch (e) { console.error('QPM: Sync error', e); }
    isSyncing = false;
}

function loadData() {
    let loaded = false;
    let gmData = null;
    let localData = null;
    try {
        if (typeof GM_getValue !== 'undefined') {
            gmData = GM_getValue(STORAGE_KEY, null);
        }
    } catch (e) { console.error('QPM: GM_getValue error', e); }
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) localData = JSON.parse(stored);
    } catch (e) { console.error('QPM: localStorage load error', e); }
    if (gmData && gmData.prompts && Array.isArray(gmData.prompts)) {
        data = gmData;
        const gmExpanded = GM_getValue(STORAGE_KEY_EXPANDED, null);
        if (gmExpanded) expandedFolders = gmExpanded;
        storageSource = 'gm';
        loaded = true;
        console.log('QPM: Loaded from GM storage');
    } else if (localData && localData.prompts && Array.isArray(localData.prompts)) {
        data = localData;
        const savedExpanded = localStorage.getItem(STORAGE_KEY + '_expanded');
        if (savedExpanded) expandedFolders = JSON.parse(savedExpanded);
        storageSource = 'local';
        loaded = true;
        console.log('QPM: Loaded from localStorage');
    }
    if (!loaded) {
        data = { folders: [], prompts: [] };
        storageSource = 'new';
        console.log('QPM: Fresh start');
    }
    if (!data.folders) data.folders = [];
    if (!data.prompts) data.prompts = [];
    data.prompts.forEach(p => {
        if (!p.hasOwnProperty('name')) p.name = '';
        if (!p.hasOwnProperty('pinned')) p.pinned = false;
        if (!p.hasOwnProperty('order')) p.order = p.createdAt;
        if (!p.hasOwnProperty('deleted')) p.deleted = false;
        if (!p.hasOwnProperty('deletedAt')) p.deletedAt = null;
    });
    initFavoritesFolder();
    autoCleanTrash();
}

window.addEventListener('beforeunload', () => saveData(false));
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY || e.key === STORAGE_KEY + '_expanded' || e.key === STORAGE_KEY + '_trigger') {
        setTimeout(() => syncFromExternalStorage(false), 100);
    }
});
setInterval(() => { syncFromExternalStorage(false); }, 3000);

// === UI МОДАЛЬНОГО ОКНА ===
function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'qpm-modal-overlay'; overlay.id = 'qpm-overlay';
    overlay.innerHTML = `
        <div class="qpm-modal">
            <div class="qpm-header">
                <div class="qpm-title">
                    <span>📚 ${t('title')}</span>
                    <span style="font-size: 10px; color: #888; margin-left: 10px;">
    ⌨️ Ctrl+Alt+N ➕ | Ctrl+Alt+P 📂 | Shift+F 🔍 | Esc ✖️
</span>
                    ${storageSource !== 'unknown' ? `<span class="qpm-storage-badge" title="${storageSource === 'gm' ? 'GM Storage (Cross-site)' : 'localStorage (Cross-site)'}">${storageSource === 'gm' ? '🔒' : '🌐'}</span>` : ''}
                    <span class="qpm-sync-badge" id="qpm-sync-badge" title="Данные синхронизируются между Qwen и DeepSeek">🔄 Cross-site Sync</span>
                </div>
                <div class="qpm-header-right">
                    <select class="qpm-lang-select" id="qpm-lang-select">
                        <option value="ru" ${currentLang === 'ru' ? 'selected' : ''}>🇷🇺 RU</option>
                        <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇬🇧 EN</option>
                        <option value="fr" ${currentLang === 'fr' ? 'selected' : ''}>🇫🇷 FR</option>
                    </select>
                    <div class="qpm-close" id="qpm-close">&times;</div>
                </div>
            </div>
            <div class="qpm-body">
                <div class="qpm-sidebar">
                    <div class="qpm-sidebar-header">
                        <span class="qpm-sidebar-title">${t('folders')}</span>
                        <div class="qpm-sidebar-buttons">
                            <button class="qpm-add-folder-btn" id="qpm-add-folder" title="${t('createFolder')}">+</button>
                            <button class="qpm-sidebar-action-btn delete-all" id="qpm-delete-all-btn" title="${t('deleteAllFolders')}">🗑️</button>
                            <button class="qpm-sidebar-action-btn" id="qpm-trash-btn" title="${t('trash')}" style="background: linear-gradient(145deg, #6a2a2a, #5a1a1a); color: #ffa8a8; border: 1px solid #9a3a3a;">🗑️</button>
                            <button class="qpm-sidebar-action-btn" id="qpm-backup-btn" title="${t('backupTitle').replace('${current}', backupStack.length).replace('${max}', MAX_BACKUPS)}" style="background: linear-gradient(145deg, #2a5a6a, #1a4a5a); color: #a8e4ff; border: 1px solid #3a8a9a;">💾</button>
                        </div>
                    </div>
                    <div class="qpm-folder-list" id="qpm-folder-list"></div>
                </div>
                <div class="qpm-main">
                    <div class="qpm-search-area">
                        <input type="text" class="qpm-search-input" id="qpm-search" placeholder="${t('search')}">
                        <div class="qpm-controls">
                            <div style="position: relative;">
                                <button class="qpm-filter-btn" id="qpm-filter-btn" title="${t('filter')}">📅</button>
                                <div class="qpm-filter-dropdown" id="qpm-filter-dropdown">
                                    <div class="qpm-filter-dropdown-item ${currentFilter === 'dateDesc' ? 'active' : ''}" data-filter="dateDesc">${t('filters.dateDesc')}</div>
                                    <div class="qpm-filter-dropdown-item ${currentFilter === 'dateAsc' ? 'active' : ''}" data-filter="dateAsc">${t('filters.dateAsc')}</div>
                                    <div class="qpm-filter-dropdown-item ${currentFilter === 'last7days' ? 'active' : ''}" data-filter="last7days">${t('filters.last7days')}</div>
                                    <div class="qpm-filter-dropdown-item ${currentFilter === 'last14days' ? 'active' : ''}" data-filter="last14days">${t('filters.last14days')}</div>
                                    <div class="qpm-filter-dropdown-item ${currentFilter === 'last30days' ? 'active' : ''}" data-filter="last30days">${t('filters.last30days')}</div>
                                    <div class="qpm-filter-dropdown-item" id="qpm-filter-trash" data-filter="trash" style="border-top: 1px solid #444; margin-top: 5px;">🗑️ ${t('trash')}</div>
                                </div>
                            </div>
                            <button class="qpm-sidebar-action-btn import" id="qpm-import-btn" title="${t('import')}">📥</button>
<button class="qpm-sidebar-action-btn export" id="qpm-export-btn" title="${t('export')}">📤</button>
                            <button class="qpm-sidebar-action-btn export-markdown" id="qpm-export-md-btn" title="${t('exportMarkdown')}" style="background: linear-gradient(145deg, #e67e22, #d35400);">📝</button>
                            <button class="qpm-add-prompt-btn" id="qpm-add-prompt">${t('newPrompt')}</button>
                        </div>
                    </div>
                    <div id="qpm-mass-actions-bar" class="qpm-mass-actions-bar hidden">
                        <div class="qpm-mass-select-all" id="qpm-mass-select-all">
                            <input type="checkbox" id="qpm-mass-select-all-checkbox">
                        </div>
                        <div class="qpm-mass-info" id="qpm-mass-info">0 ${t('selectedCount')}</div>
                        <div class="qpm-mass-buttons">
                            <button class="qpm-mass-btn move" id="qpm-mass-move">📁 ${t('massMove')}</button>
                            <button class="qpm-mass-btn delete" id="qpm-mass-delete">🗑️ ${t('massDelete')}</button>
                            <button class="qpm-mass-btn restore" id="qpm-mass-restore" style="display: none;">↩️ ${t('massRestore')}</button>
                            <button class="qpm-mass-btn delete-permanent" id="qpm-mass-delete-permanent" style="display: none;">💀 ${t('massDeletePermanent')}</button>
                        </div>
                    </div>
                    <div class="qpm-prompt-list" id="qpm-prompt-list"></div>
                    <div class="qpm-stats-bar" id="qpm-stats-bar">
                        <div class="qpm-stats-item">
                            <span class="qpm-stats-label">📝 ${t('chars')}:</span>
                            <span class="qpm-stats-value qpm-stats-chars">0</span>
                        </div>
                        <div class="qpm-stats-item">
                            <span class="qpm-stats-label">🔢 ${t('tokens')} (${t('progress')}):</span>
                            <span class="qpm-stats-value qpm-stats-tokens">0</span>
                            <span class="qpm-token-info" title="${t('tokenLimit')}">ℹ️</span>
                        </div>
                        <div class="qpm-stats-item">
                            <span class="qpm-stats-label">📊 ${t('progress')}:</span>
                            <div class="qpm-stats-progress">
                                <div class="qpm-stats-progress-fill" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input type="file" id="qpm-import-input" accept=".json">
    `;
    document.body.appendChild(overlay);
    modalEl = overlay;
    overlay.querySelector('#qpm-lang-select').addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('qpm_language', currentLang);
        updateModalContent();
    });
    const filterBtn = overlay.querySelector('#qpm-filter-btn');
    const filterDropdown = overlay.querySelector('#qpm-filter-dropdown');
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
        if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.classList.remove('show');
        }
    });
    filterDropdown.querySelectorAll('.qpm-filter-dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            filterDropdown.querySelectorAll('.qpm-filter-dropdown-item').forEach(i => i.classList.remove('active'));
            e.target.classList.add('active');
            filterDropdown.classList.remove('show');
            if (currentFilter === 'trash') {
                currentFolderId = 'trash';
                clearSelection();
                renderFolders();
                renderTrash();
                updateTrashBadge();
                updateMassActionsBar();
            } else {
                if (currentFolderId === 'trash') currentFolderId = 'all';
                clearSelection();
                renderPrompts(currentSearchQuery);
            }
        });
    });
    overlay.querySelector('#qpm-close').addEventListener('click', toggleModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) toggleModal(); });
    overlay.querySelector('#qpm-add-folder').addEventListener('click', () => { createFolder(null); autoSave(); });
    overlay.querySelector('#qpm-add-prompt').addEventListener('click', () => openEditor(null));
    overlay.querySelector('#qpm-backup-btn').addEventListener('click', () => {
        showBackupDialog();
    });
    const searchInput = overlay.querySelector('#qpm-search');
    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        clearSelection();
        renderPrompts(e.target.value);
    });
    searchInput.addEventListener('keyup', (e) => {
        const cursorPos = searchInput.selectionStart;
        updateTagDropdown(searchInput, cursorPos);
    });
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (tagDropdown) tagDropdown.style.display = 'none';
        }, 200);
    });
    overlay.querySelector('#qpm-export-btn').addEventListener('click', exportPrompts);
    overlay.querySelector('#qpm-export-md-btn').addEventListener('click', exportToMarkdown);
    overlay.querySelector('#qpm-delete-all-btn').addEventListener('click', deleteAllFoldersMenu);
    overlay.querySelector('#qpm-trash-btn').addEventListener('click', () => {
        currentFolderId = 'trash';
        clearSelection();
        renderFolders();
        renderTrash();
        updateTrashBadge();
        updateMassActionsBar();
    });
    const selectAllContainer = overlay.querySelector('#qpm-mass-select-all');
    const selectAllCheckbox = overlay.querySelector('#qpm-mass-select-all-checkbox');
    selectAllContainer.addEventListener('click', (e) => {
        if (e.target !== selectAllCheckbox) {
            selectAllCheckbox.click();
        }
    });
    selectAllCheckbox.addEventListener('change', () => { toggleSelectAll(); });
    overlay.querySelector('#qpm-mass-move').addEventListener('click', () => massMoveSelected());
    overlay.querySelector('#qpm-mass-delete').addEventListener('click', () => massDeleteSelected());
    overlay.querySelector('#qpm-mass-restore').addEventListener('click', () => massRestoreSelected());
    overlay.querySelector('#qpm-mass-delete-permanent').addEventListener('click', () => massDeletePermanentlySelected());
    const importInput = overlay.querySelector('#qpm-import-input');
    overlay.querySelector('#qpm-import-btn').addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            importPrompts(e.target.files[0]);
            autoSave();
            e.target.value = '';
        }
    });
}

function updateModalContent() {
    if (!modalEl) return;
    modalEl.querySelector('.qpm-title span').textContent = '📚 ' + t('title');
    modalEl.querySelector('.qpm-sidebar-title').textContent = t('folders');
    modalEl.querySelector('#qpm-add-folder').title = t('createFolder');
    modalEl.querySelector('#qpm-delete-all-btn').title = t('deleteAllFolders');
    modalEl.querySelector('#qpm-trash-btn').title = t('trash');
    modalEl.querySelector('#qpm-search').placeholder = t('search');
    modalEl.querySelector('#qpm-filter-btn').title = t('filter');
    modalEl.querySelector('#qpm-import-btn').title = t('import');
    modalEl.querySelector('#qpm-export-btn').title = t('export');
    modalEl.querySelector('#qpm-add-prompt').textContent = t('newPrompt');
    const filterItems = modalEl.querySelectorAll('.qpm-filter-dropdown-item');
    if (filterItems[0]) filterItems[0].textContent = t('filters.dateDesc');
    if (filterItems[1]) filterItems[1].textContent = t('filters.dateAsc');
    if (filterItems[2]) filterItems[2].textContent = t('filters.last7days');
    if (filterItems[3]) filterItems[3].textContent = t('filters.last14days');
    if (filterItems[4]) filterItems[4].textContent = t('filters.last30days');
    if (filterItems[5]) filterItems[5].textContent = '🗑️ ' + t('trash');
    modalEl.querySelector('#qpm-mass-move').innerHTML = `📁 ${t('massMove')}`;
    modalEl.querySelector('#qpm-mass-delete').innerHTML = `🗑️ ${t('massDelete')}`;
    modalEl.querySelector('#qpm-mass-restore').innerHTML = `↩️ ${t('massRestore')}`;
    modalEl.querySelector('#qpm-mass-delete-permanent').innerHTML = `💀 ${t('massDeletePermanent')}`;
    renderFolders();
    if (currentFolderId === 'trash') {
        renderTrash();
    } else {
        renderPrompts();
    }
    updateMassActionsBar();
}

function toggleModal() {
    if (!modalEl) { loadData(); createModal(); }
    modalOpen = !modalOpen;
    modalEl.style.display = modalOpen ? 'flex' : 'none';
    if (modalOpen) {
        currentSearchQuery = '';
        clearSelection();
        if (modalEl.querySelector('#qpm-search')) modalEl.querySelector('#qpm-search').value = '';
        renderFolders();
        if (currentFolderId === 'trash') {
            renderTrash();
        } else {
            renderPrompts();
        }
        updateTrashBadge();
        syncFromExternalStorage(true);
        // Показываем уведомление об обновлении, если есть
        showUpdateNotificationInModal();
    }
}

function injectButton() {
    if (document.querySelector('.qpm-btn')) return;

    let container = null;
    let insertBeforeElement = null;

    // Специальная обработка для разных сайтов
    if (currentHost === 'alice.yandex.ru') {
        // Алиса: ищем кнопку микрофона
        const aliceButton = document.querySelector('button[data-testid="oknyx"], button[aria-label*="Алиса"], button.StandaloneOknyx');
        if (aliceButton && aliceButton.parentElement) {
            container = aliceButton.parentElement;
            insertBeforeElement = aliceButton;
        } else {
            const textarea = document.querySelector('textarea.AliceInput-Textarea');
            if (textarea && textarea.parentElement) {
                container = textarea.parentElement;
                const sendButton = container.querySelector('button[type="submit"], button[aria-label*="отправить"]');
                if (sendButton) insertBeforeElement = sendButton;
            }
        }
    } else if (currentHost === 'giga.chat') {
        // GigaChat: ищем кнопку голосового ввода
        const voiceButton = document.querySelector('button[data-da_name="CallButton"]');

        if (voiceButton) {
            // Вставляем прямо перед кнопкой голоса
            container = voiceButton.parentElement;
            insertBeforeElement = voiceButton;
            console.log('QPM: Найдена кнопка голоса, вставляем перед ней');
        } else {
            // Альтернативный поиск
            const textarea = document.querySelector('textarea');
            if (textarea) {
                let parent = textarea.parentElement;
                for (let i = 0; i < 5 && parent; i++) {
                    const btns = parent.querySelectorAll('button');
                    if (btns.length > 0) {
                        container = parent;
                        insertBeforeElement = btns[0];
                        break;
                    }
                    parent = parent.parentElement;
                }
            }
        }
    } else {
        // Стандартная обработка для других сайтов
        const containers = config.buttonContainer.split(',').map(s => s.trim());
        for (const selector of containers) {
            container = document.querySelector(selector);
            if (container) break;
        }

        const refs = config.insertBefore.split(',').map(s => s.trim());
        for (const ref of refs) {
            insertBeforeElement = container?.querySelector(ref);
            if (insertBeforeElement) break;
        }
    }

    if (container) {
        if (container.querySelector('.qpm-btn')) return;

        const btn = document.createElement('button');
        btn.className = 'qpm-btn';
        btn.innerHTML = config.buttonLabel;
        btn.title = t('title');

        // Базовые стили кнопки
        btn.style.cssText = `
            background: linear-gradient(145deg, #10a37f, #0e8c6d);
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            margin: 0 4px;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            height: 34px;
            white-space: nowrap;
            font-family: inherit;
            position: relative;
            z-index: 9999;
            pointer-events: auto !important;
        `;

        // Адаптивные стили для GigaChat
        if (currentHost === 'giga.chat') {
            btn.style.borderRadius = '8px';
            btn.style.padding = '6px 12px';
            btn.style.fontSize = '12px';
            btn.style.height = '32px';
            btn.style.marginRight = '8px';
        }

        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-1px)';
            btn.style.boxShadow = '0 4px 12px rgba(16, 163, 127, 0.4)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        });

        // Обработчик клика
        const clickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log(`QPM: Кнопка нажата на ${currentHost}, открываем менеджер`);
            toggleModal();
            return false;
        };

        btn.addEventListener('click', clickHandler);

        // Защита от перехвата событий
        btn.addEventListener('mousedown', (e) => e.stopPropagation());
        btn.addEventListener('mouseup', (e) => e.stopPropagation());

        // Вставляем кнопку
        if (insertBeforeElement) {
            container.insertBefore(btn, insertBeforeElement);
            console.log('QPM: Кнопка вставлена перед целевым элементом');
        } else {
            container.appendChild(btn);
            console.log('QPM: Кнопка добавлена в конец контейнера');
        }

                // Выравниваем кнопки на GigaChat
        if (currentHost === 'giga.chat') {
            setTimeout(alignGigaChatButtons, 100);
        }
        console.log(`QPM: Кнопка добавлена на ${currentHost}`);
        return true;
    }

    console.log(`QPM: Контейнер не найден для ${currentHost}`);
    return false;
}

function alignGigaChatButtons() {
    if (currentHost !== 'giga.chat') return;

    // Небольшая задержка, чтобы DOM полностью загрузился
    setTimeout(() => {
        const group = document.querySelector('.styled__Group-sc-ac724d02-2');
        const qpmBtn = document.querySelector('.qpm-btn');
        const voiceBtn = document.querySelector('button[data-da_name="CallButton"]');

        if (group && qpmBtn && voiceBtn) {
            group.style.display = 'flex';
            group.style.alignItems = 'center';
            group.style.gap = '8px';
            group.style.justifyContent = 'flex-start';

            qpmBtn.style.order = '-1';
            qpmBtn.style.marginRight = '8px';
            qpmBtn.style.marginLeft = '0';

            voiceBtn.style.marginLeft = 'auto';

            console.log('QPM: Кнопки выровнены на GigaChat');
        }
    }, 500);
}

function autoSave() { saveData(false); }

// === ЗАПУСК ===
loadData();
loadBackupsFromStorage();
checkDailyBackup();
checkForUpdates();   // <-- добавить эту строку
document.addEventListener('keydown', (e) => {
    // Проверяем, открыт ли редактор
    const editorOverlay = document.getElementById('qpm-editor-overlay');
    const isEditorOpen = editorOverlay && editorOverlay.style.display === 'flex';

    // Ctrl+Alt+N - создать новый промпт
    if (e.ctrlKey && e.altKey && !e.shiftKey && !e.metaKey && e.code === 'KeyN') {
        e.preventDefault();
        e.stopPropagation();
        if (!modalOpen) toggleModal();
        setTimeout(() => openEditor(null), 120);
        return;
    }

    // Ctrl+Alt+P - открыть/закрыть менеджер
    if (e.ctrlKey && e.altKey && !e.shiftKey && !e.metaKey && e.code === 'KeyP') {
        e.preventDefault();
        e.stopPropagation();
        toggleModal();
        return;
    }

    // Shift+F - фокус на поиск (когда менеджер открыт)
    if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey && e.code === 'KeyF') {
        e.preventDefault();
        if (modalOpen && modalEl) {
            const searchInput = modalEl.querySelector('#qpm-search');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        return;
    }

    // Shift+S - сохранить (когда редактор открыт)
    if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey && e.code === 'KeyS') {
        if (editorOverlay && editorOverlay.style.display === 'flex') {
            e.preventDefault();
            const saveBtn = editorOverlay.querySelector('#qpm-editor-save');
            if (saveBtn) saveBtn.click();
        }
        return;
    }

    // Escape - закрыть
    if (e.code === 'Escape') {
        const editor = document.getElementById('qpm-editor-overlay');
        // Если открыт редактор - закрываем только его
        if (editor && editor.style.display === 'flex') {
            closeEditor();
            return;
        }
        // Если редактор закрыт, но открыт менеджер - закрываем менеджер
        if (modalOpen) {
            toggleModal();
            return;
        }
    }

    // Ctrl+Enter - сохранить в редакторе
    if ((e.ctrlKey || e.metaKey) && e.code === 'Enter') {
        if (editorOverlay && editorOverlay.style.display === 'flex') {
            const saveBtn = editorOverlay.querySelector('#qpm-editor-save');
            if (saveBtn) {
                e.preventDefault();
                saveBtn.click();
                return;
            }
        }
    }

    // Пропускаем ввод в полях
    const target = e.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
});

if (!testLocalStorage()) {
    console.warn('QPM: localStorage may not be persistent (incognito mode?)');
}

// Функция для повторных попыток добавления кнопки
let injectAttempts = 0;
const maxInjectAttempts = 10;

function tryInjectButton() {
    const success = injectButton();
    if (!success && injectAttempts < maxInjectAttempts) {
        injectAttempts++;
        setTimeout(tryInjectButton, 2000);
    }
}

// Запускаем попытки добавить кнопку
setTimeout(tryInjectButton, 1000);
setTimeout(tryInjectButton, 3000);
setTimeout(tryInjectButton, 5000);

// Наблюдатель за изменениями в DOM
const obs = new MutationObserver(() => {
    // Проверяем, не появился ли контейнер
    if (!document.querySelector('.qpm-btn')) {
        injectButton();
    } else {
        // Если кнопка уже есть, выравниваем её на GigaChat
        alignGigaChatButtons();
    }
});
obs.observe(document.body, { childList: true, subtree: true });

if (!Array.isArray(data.prompts)) {
    console.error('QPM: data.prompts is not array, resetting');
    data.prompts = [];
}
if (!Array.isArray(data.folders)) {
    console.error('QPM: data.folders is not array, resetting');
    data.folders = [];
}

})();
